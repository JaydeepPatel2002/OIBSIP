<template>
  <!-- Customer name -->
  <!--    invalid-feedback prop is bound to the data variable object 'violation' and its familyName attribute
      hasErr prop is bound to the computed object 'hasErr' and it's ln attribute-->
  <b-form-group :invalid-feedback="violation.Date" class="mb-1">
    <b-button variant="primary" :disabled="false" @click="calldata2">
      <b-icon-x-square-fill /> click to load all employees</b-button>
    <b-input-group>
      <!--    tooltip hovers to the right of the prepend div-->
      <!--      <b-input-group-prepend is-text v-b-tooltip.hover.right="dt.cN">-->
      <!--        &lt;!&ndash;    add icon to left of input box and the title attribute is bound to the data variable object 'dt' and its ln attribute&ndash;&gt;-->
      <!--        <b-icon-people-fill :title="dt.cN" />-->
      <!--      </b-input-group-prepend>-->

      //<b-form-select title="employee options" :options="finalOption"></b-form-select>
    </b-input-group>

    <b-input-group>
      <!--    tooltip hovers to the right of the prepend div-->
      <!--      <b-input-group-prepend is-text v-b-tooltip.hover.right="dt.cN">-->
      <!--        &lt;!&ndash;    add icon to left of input box and the title attribute is bound to the data variable object 'dt' and its ln attribute&ndash;&gt;-->
      <!--        <b-icon-people-fill :title="dt.cN" />-->
      <!--      </b-input-group-prepend>-->

      <b-form-input :placeholder="dt.cN" :has-err="hasErr.cN" :disabled="isDisabled"
                    v-model="tempWorkedHours.Date" trim @keydown="violation.CustomerName = null" />
    </b-input-group>

    <b-input-group>
      <!--    tooltip hovers to the right of the prepend div-->
      <!--      <b-input-group-prepend is-text v-b-tooltip.hover.right="dt.cN">-->
      <!--        &lt;!&ndash;    add icon to left of input box and the title attribute is bound to the data variable object 'dt' and its ln attribute&ndash;&gt;-->
      <!--        <b-icon-people-fill :title="dt.cN" />-->
      <!--      </b-input-group-prepend>-->

      <b-form-input :placeholder="dt.cN" :has-err="hasErr.cN" :disabled="isDisabled"
                    v-model="tempWorkedHours.TotalIncome" trim @keydown="violation.CustomerName = null" />
    </b-input-group>
  </b-form-group>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
import { GlobalMixin } from '@/mixins/global-mixin'
import { BIcon } from 'bootstrap-vue'
import { WorkedHours } from '../../../Back_end/src/entity/WorkedHours'
import { employee } from '../../../Back_end/src/entity/employee'

export default class FoodOrderForm extends Mixins(GlobalMixin) {
  SelectedEmployee: any;

  data () {
    return {
      finalOption: [],
      results: [],

      tempWorkedHours: {
        employee: null,
        Date: '',
        TotalIncome: 0.0
      },
      SelectedEmployee: {
        id: null,
        employeeName: '',
        perHourPay: 0.0,
        joiningDate: ''
      }

    }
  }

  @Prop({ type: Object, validator: s => s instanceof Object }) readonly WorkedHours: any

  $refs!: {
  iconDelete: BIcon
  iconSave: BIcon
}

  finalOption = []
  results= []

tempWorkedHours: WorkedHours = new WorkedHours() // will store a copy of the values from the student declared in the props section
  violation: any = {} // will store violation messages that we get from the api
  dt = { // Display Text - object that stores text to display to the user instead of the attribute names
    cN: 'customer Name',
    bN: 'burger Name',
    dN: 'drink Address',
    sN: 'side Item',
    aN: 'additional notes',
    p: 'price'
  }

  showConfirmDelete = false
  saveWorkedHours () {
    const icon: BIcon = this.$refs.iconSave // get the icon to animate from the vue refs https://vuejs.org/v2/api/#ref
    this.setBusy(true)// tell parent that this component is waiting for the api to respond
    this.animate(icon, true)// animate the icon in the clicked button to give the user an indication that some thing is happening
    this.violation = {}// empty out violation messages - to hide violation message from user and wait for new violations from the api

    // use the method declared in the student mixin to call the student api
    // if the student is new POST , if the student already exists then PUT
    const url = this.FOODORDER_API + (this.isNew ? '' : '/' + this.tempWorkedHours.id)
    const method = this.isNew ? 'post' : 'put'

    this.callAPI(url, method, this.tempWorkedHours) // returns a promise object
      .then(data => {
        // determine if the student was added or updated
        this.$emit(this.tempWorkedHours.id === data.id ? 'updated' : 'added', data)
        this.tempWorkedHours = {

          id: null,
          employee: null,
          Date: '',
          TotalIncome: 0.0
        }
      })
      .catch(err => {
        // get the violation messages from the api - if the web server responded
        this.violation = err.data || {}
      })
      .finally(() => {
        this.setBusy(false)// tell parent that this component is no longer waiting for the api
        this.animate(icon, false)// stop the icon animation
      })
  }

  cancel () {
    this.violation = {} // clear out violation messages and as a result the hasErrs will be null
    this.tempWorkedHours = Object.assign({}, this.WorkedHours)// copy the student values to a new temp student
    this.$emit('cancelled', this.WorkedHours) // tell parent that cancel was called
  }

  calldata2 () {
    this.callAPI(this.EMPLOYEE_API, 'get')
      .then(data => {
        this.results = data
        console.log(this.results)
        for (let i = 0; i < this.results.length; i++) {
          var j = this.results[i]
          this.finalOption.push({ value: this.results[i], text: this.results[i].employeeName })
        }
        console.log(this.finalOption)
      })
      .catch(() => {
        this.results = [] // if error then empty out array of students
      })
      .finally(() => {
        this.setBusy(false) // tell parent component that this component is no longer waiting for the api
      })
  }

  select () {
    this.tempWorkedHours = Object.assign({}, this.WorkedHours)
  }

  deleteWorkedHours () {
    const icon:BIcon = this.$refs.iconDelete // get the icon to animate from the vue refs https://vuejs.org/v2/api/#ref
    this.setBusy(true)// tell parent that this component is waiting for the api
    this.animate(icon, true)// animate the icon the clicked button
    this.violation = {}// empty out violation messages
    this.callAPI(this.WORKHOURS_API + '/' + this.WorkedHours.id, 'delete')
      .then(res => {
        this.tempWorkedHours = {
          id: null,
          employee: null,
          Date: '',
          TotalIncome: 0.0
        }
        this.$emit('deleted', this.WorkedHours)// tell parent student was deleted
      })
      .catch(() => {
        this.$emit('reset', this.WorkedHours)
      })
      .finally(() => {
        this.setBusy(false)// tell parent that this component is no longer waiting for the api
        this.animate(icon, false)// stop the icon animation
      })
  }

  animate (icon:BIcon, start:boolean) {
    if (start) {
      // apply animation style to the icon
      icon.classList.add('b-icon-animation-cylon-vertical')
    } else {
      // remove animation style from the icon
      icon.classList.remove('b-icon-animation-cylon-vertical')
    }
  }

  get hasErr (): any {
    return { // bootstrap hasErrs used to display violation messages
      // true - green border, false - red border, null- regular border

      cN: this.violation.CustomerName ? false : null,
      bN: this.violation.burger ? false : null,
      dN: this.violation.Drink ? false : null,
      sN: this.violation.SideItem ? false : null,
      aN: this.violation.AdditionalNote ? false : null,
      p: this.violation.price ? false : null
    }
  }

  get isNew (): boolean {
    // if studentID is null, 0 , '' then it's a new student not an existing student
    return !this.WorkedHours || !this.WorkedHours.id
  }

  @Watch('student', { deep: true })// watch all attributes of the student object - if any attribute changes then execute the handler
  onWorkedHoursChanged (newStu: WorkedHours, oldStu: WorkedHours) { // execute this function when the student object in the props section changes
    if (!newStu || !newStu.id) {
      // if new student is null or doesn't have an id
      this.tempWorkedHours = new WorkedHours()// clear out temporary student
    } else if (!oldStu || newStu.id !== oldStu.id) {
      // if old student is null or new student is not the same as old student
      // COPY VALUES from the student prop into new a temp student object
      this.tempWorkedHours = Object.assign(new WorkedHours(), this.WorkedHours)
    }
    this.violation = {}// empty out violation messages - to hide them from the user
  }
}
</script>

<style scoped>

</style>
