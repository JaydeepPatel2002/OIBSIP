<template>
  <div>
    <!-- employee NAME -->
    <!--    invalid-feedback prop is bound to the data variable object 'violation' and its familyName attribute
        hasErr prop is bound to the computed object 'hasErr' and it's ln attribute-->
    <b-form-group :invalid-feedback="violation.employeeName" :has-err="hasErr.eN" class="mb-1">
      <b-input-group>
        <!--    tooltip hovers to the right of the prepend div-->
        <b-input-group-prepend is-text v-b-tooltip.hover.right="dt.eN">
          <!--    add icon to left of input box and the title attribute is bound to the data variable object 'dt' and its ln attribute-->
          <b-icon-person :title="dt.eN" />
        </b-input-group-prepend>

        <b-form-input :placeholder="dt.eN" :has-err="hasErr.eN" :disabled="isDisabled"
                      v-model="tempEmployee.employeeName" trim @keydown="violation.employeeName=null" />
      </b-input-group>
    </b-form-group>
    <!-- per hour pay -->
    <!--    invalid-feedback prop is bound to the data variable object 'violation' and its familyName attribute
        hasErr prop is bound to the computed object 'hasErr' and it's ln attribute-->
    <b-form-group :invalid-feedback="violation.perHourPay" :has-err="hasErr.pP" class="mb-1">
      <b-input-group>
        <!--    tooltip hovers to the right of the prepend div-->
        <b-input-group-prepend is-text v-b-tooltip.hover.right="dt.pP">
          <!--    add icon to left of input box and the title attribute is bound to the data variable object 'dt' and its ln attribute-->
          <b-icon-chevron-right :title="dt.pP" />
        </b-input-group-prepend>

        <b-form-input :placeholder="dt.pP" :has-err="hasErr.pP" :disabled="isDisabled"
                      v-model="tempEmployee.perHourPay" trim @keydown="violation.perHourPay=null" />
      </b-input-group>
    </b-form-group>
    <!-- joining date -->
    <!--    invalid-feedback prop is bound to the data variable object 'violation' and its familyName attribute
        hasErr prop is bound to the computed object 'hasErr' and it's ln attribute-->
    <b-form-group :invalid-feedback="violation.joiningDate" :has-err="hasErr.jD" class="mb-1">
      <b-form-datepicker id="example-datepicker" v-model="tempEmployee.joiningDate" class="mb-2"></b-form-datepicker>
      <b-input-group>
        <!--    tooltip hovers to the right of the prepend div-->
        <b-input-group-prepend is-text v-b-tooltip.hover.right="dt.jD">
          <!--    add icon to left of input box and the title attribute is bound to the data variable object 'dt' and its ln attribute-->
          <b-icon-people-fill :title="dt.jD" />
        </b-input-group-prepend>

        <b-form-input :placeholder="dt.jD" :has-err="hasErr.jD" :disabled="isDisabled"
                      v-model="tempEmployee.joiningDate" trim @keydown="violation.joiningDate=null" />
      </b-input-group>
    </b-form-group>
    <b-button-group class="w-100 mb-3">
      <!--    save button,  onclick call the saveStudent function
        disabled prop is bound to the computed property 'isDisabled' -->
      <b-button variant="primary" :disabled="isDisabled" @click="saveEmployee">
        <!--    use a cloud icon, add a ref (reference) to this icon as 'iconSave' so we can animate it when saveStudent is called
            https://vuejs.org/v2/api/#ref -->
        <b-icon-cloud-arrow-up-fill ref="iconSave" /> Save</b-button>
      <b-button variant="danger" :disabled="isDisabled || isNew" @click="deleteConfirm">
        <!--    use a trash icon, add a ref (reference) to this icon as 'iconDelete' so we can animate it when deleteStudent is called
            https://vuejs.org/v2/api/#ref -->
        <b-icon-trash-fill ref="iconDelete" /> Delete</b-button>
      <b-button variant="primary" :disabled="isDisabled" @click="cancel">
        <b-icon-x-square-fill /> Cancel</b-button>
    </b-button-group>

    <!-- DELETE CONFIRM -- show hide the modal using the showConfirmDelete data variable as a model -->
    <b-modal title="Delete employee" ok-variant="danger" cancel-variant="primary"
             @ok="deleteEmployee" v-model="showConfirmDelete">
      <!--    using slots -- https://vuejs.org/v2/guide/components-slots.html
        slot defined in b-modal -- https://bootstrap-vue.org/docs/components/modal#comp-ref-b-modal-slots
        modify the buttons that appear in the footer of the modal using pre-defined slots-->
      <template #modal-cancel>
        <!-- add a X icon to the cancel button-->
        <b-icon-x-square-fill /> Cancel
      </template>

      <template #modal-ok>
        <!-- change the OK button to say Delete instead and add a trash can icon-->
        <b-icon-trash-fill /> Delete
      </template>
      Are you sure you want to delete {{tempEmployee.id}}, {{tempEmployee.employeeName}}?
    </b-modal>

    <!-- ERROR MESSAGE -->
    <!--    only show this alert when there is an violationMessage attribute in the data variable object 'violation'    -->
    <b-alert variant="danger" :show="violation.violationMessage">
      {{violation.violationMessage}}
    </b-alert>
    <!--    ONLY SHOW debug info (very ugly) if the debug prop is set to true-->
    <b-alert variant="secondary" dismissible :show="debug">
      <pre>
PROPS:
{{$props}}

DATA:
{{$data}}
        </pre>
    </b-alert>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
import { GlobalMixin } from '@/mixins/global-mixin'
import { employee } from '../../../Back_end/src/entity/employee'
import { BIcon } from 'bootstrap-vue'

export default class employeeForm extends Mixins(GlobalMixin) {
  // eslint-disable-next-line new-cap
  tempEmployee: employee = new employee() // will store a copy of the values from the student declared in the props section
  data () {
    return {
      selected: null,
      tempEmployee: {
        employeeName: '',
        perHourPay: 0.0,
        joiningDate: ''
      }

    }
  }

  @Prop({ type: Object, validator: s => s instanceof Object }) readonly employee: any

  $refs!: {
    iconDelete: BIcon
    iconSave : BIcon
  }

  // eslint-disable-next-line new-cap
  // tempEmployee: employee = new employee() // will store a copy of the values from the student declared in the props section
  violation: any = {} // will store violation messages that we get from the api
  dt = { // Display Text - object that stores text to display to the user instead of the attribute names
    eN: 'Employee Name',
    pP: 'per hour pay',
    jD: 'joining date'
  }

  showConfirmDelete = false

  saveEmployee () {
    const icon:BIcon = this.$refs.iconSave // get the icon to animate from the vue refs https://vuejs.org/v2/api/#ref
    this.setBusy(true)// tell parent that this component is waiting for the api to respond
    this.animate(icon, true)// animate the icon in the clicked button to give the user an indication that some thing is happening
    this.violation = {}// empty out violation messages - to hide violation message from user and wait for new violations from the api

    // use the method declared in the student mixin to call the student api
    // if the student is new POST , if the student already exists then PUT
    const url = this.EMPLOYEE_API + (this.isNew ? '' : '/' + this.tempEmployee.id)
    const method = this.isNew ? 'post' : 'put'

    this.callAPI(url, method, this.tempEmployee) // returns a promise object
      .then(data => {
        // determine if the student was added or updated
        this.$emit(this.tempEmployee.id === data.id ? 'updated' : 'added', data)
      })
      .catch(err => {
        // get the violation messages from the api - if the web server responded
        this.violation = err.data || {}
      })
      .finally(() => {
        this.setBusy(false)// tell parent that this component is no longer waiting for the api
        // this.animate(icon, false)// stop the icon animation
      })
  }

  cancel () {
    this.violation = {} // clear out violation messages and as a result the hasErrs will be null
    this.tempEmployee = Object.assign({}, this.employee)// copy the student values to a new temp student
    this.$emit('cancelled', this.employee) // tell parent that cancel was called
  }

  deleteEmployee () {
    const icon:BIcon = this.$refs.iconDelete // get the icon to animate from the vue refs https://vuejs.org/v2/api/#ref
    this.setBusy(true)// tell parent that this component is waiting for the api
    this.animate(icon, true)// animate the icon the clicked button
    this.violation = {}// empty out violation messages
    this.callAPI(this.EMPLOYEE_API + '/' + this.tempEmployee.id, 'delete')
      .then(res => {
        // eslint-disable-next-line new-cap
        this.tempEmployee = new employee()
        this.$emit('deleted', this.employee)// tell parent student was deleted
      })
      .catch(() => {
        this.$emit('reset', this.employee)
      })
      .finally(() => {
        this.setBusy(false)// tell parent that this component is no longer waiting for the api
        this.animate(icon, false)// stop the icon animation
      })
  }

  deleteConfirm () {
    this.cancel() // reset values - in case user edited before attempting to delete
    this.showConfirmDelete = true // show the modal confirm message
    // IMPORTANT- the b-modal built-in "ok" "and "cancel" buttons automatically close/hide the modal
    // closing the modal automatically updates the showConfirmDelete
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
      eN: this.violation.employeeName ? false : null,
      pP: this.violation.perHourPay ? false : null,
      jD: this.violation.joiningDate ? false : null
    }
  }

  get isNew (): boolean {
    // if studentID is null, 0 , '' then it's a new student not an existing student
    return !this.employee || !this.employee.id
  }

  @Watch('employee', { deep: true })// watch all attributes of the student object - if any attribute changes then execute the handler
  onStudentChanged (newemployee: employee, oldemployee: employee) { // execute this function when the student object in the props section changes
    if (!newemployee || !newemployee.id) {
      // if new student is null or doesn't have an id
      // eslint-disable-next-line new-cap
      this.tempEmployee = new employee()// clear out temporary student
    } else if (!oldemployee || newemployee.id !== oldemployee.id) {
      // if old student is null or new student is not the same as old student
      // COPY VALUES from the student prop into new a temp student object
      // eslint-disable-next-line new-cap
      this.tempEmployee = Object.assign(new employee(), this.employee)
    }
    this.violation = {}// empty out violation messages - to hide them from the user
  }
}
</script>

<style scoped>

</style>
