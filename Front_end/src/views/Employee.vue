<template>
  <div class="text-left">
    <div class="row">
      <h1 class="col-lg-8">Employees:</h1>
      <!-- SEARCH : when user selects student from search list then call the b-table selectRow function-->
    </div>
    <!--    <b-button variant="primary" :disabled="false" @click="calldata">-->
    <!--      <b-icon-x-square-fill /> Cancel</b-button>-->
    <div class="row">
      <!--      <b-form-select title="fwe" :options="finalOption"></b-form-select>-->

      <!--      STUDENT FORM,
            bind the student prop to the data variable object 'selectedStudent',
            bind the disabled prop to the computed property 'isDisabled'
            set debug prop as needed
            handle all the emitted events from the StudentForm component
            -->

      <Employeeform class="col-md-6 col-lg-4 order-md-1 pl-lg-0 " debug
                    :employee="selectedemployee" :disabled="isDisabled" @busy="setBusy"
                    @added="handleAdd" @updated="handleUpdate" @deleted="handleDelete"
                    @cancelled="handleCancel" @reset="handleReset" />
      <!--      STUDENT TABLE,
            bind the disabled prop to the computed property 'isDisabled'
            handle all the emitted events from the StudentTable component
            set debug prop as needed
            add a ref (reference) to this component as 'studentTable' so we can animate it when saveStudent is called
            https://vuejs.org/v2/api/#ref
            -->
      <!--    show the overlay if the component is busy or disabled-->
      <b-overlay :show="isDisabled" opacity=".25" class="col-md-6 col-lg-8 order-md-0">
        <b-table ref="employeeTable" responsive
                 :items="provider" :fields="fields" :api-url="EMPLOYEE_API" @row-clicked="selectedemployee=$event"
                 selectable select-mode="single" selected-variant="primary" striped hover primary-key="id"
                 no-provider-sorting no-provider-paging no-provider-filtering>
          <template #table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>
          </template>

        </b-table>
      </b-overlay>
    </div>
    <!--    ONLY SHOW debug info (very ugly) if the debug prop is set to true-->
    <b-alert variant="secondary" dismissible :show="debug">
      <pre>
PROPSEmployee:
{{$props}}

DATA:
{{$data}}
        </pre>
    </b-alert>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { BTable, BvTableCtxObject } from 'bootstrap-vue/src/components/table'
import { GlobalMixin } from '@/mixins/global-mixin'
import AutoSearch from '@/components/AutoSearch.vue'
import FoodOrderForm from '@/components/FoodOrderForm.vue'
import { employee } from '../../../Back_end/src/entity/employee'
import Employeeform from '@/components/employeeform.vue'

import WorkedHoursForm from '@/components/WorkedHoursForm.vue'

// this our TypeScript Component Class instead of the less friendly  JS class
@Component({
  components: { WorkedHoursForm, Employeeform, AutoSearch }
})

export default class employeeView extends Mixins(GlobalMixin) {
  $refs!: {
    employeeTable: BTable
  }

  finalOption = []
  results= []
  provider (ctx:BvTableCtxObject):Promise<any> {
    // return fetch('' + ctx.apiUrl).then(res => res.json())
    return this.callAPI('' + ctx.apiUrl)
  }

  // eslint-disable-next-line new-cap
  selectedemployee:employee = {
    id: null,
    employeeName: '',
    perHourPay: 0.0,
    joiningDate: ''
  }

  // computed from b-table localItems
  get employees () {
    return this.$refs.employeeTable.localItems
  }

  fields=[
    { key: 'id', sortable: true },
    { key: 'employeeName', sortable: true },
    { key: 'perHourPay', sortable: true },
    { key: 'joiningDate', sortable: true }

  ]

  selectRow (item:any) {
    if (!item.id) return
    this.$refs.employeeTable.selectRow(this.employees.findIndex((i:any) => i.id === item.id))
  }

  refreshTable () {
    this.$refs.employeeTable.refresh()
  }

  handleSelect (employee:employee) {
    this.selectRow(employee)
    this.selectedemployee = employee
  }

  handleAdd (employee:employee) { // StudentForm emits a student when a new student returns from the api
    console.log('hello')
    this.employees.unshift(employee)
    this.handleSelect(employee)
  }

  calldata () {
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

  // a computed getter

  handleUpdate (employee:employee) { // StudentForm emits a student when an existing student is updated in the api
    Object.assign(this.selectedemployee, employee) // update the values in the selectedStudent to the updated values
  }

  handleDelete (Employee:employee) { // StudentForm emits a student when an existing student is deleted in the api
    // eslint-disable-next-line new-cap
    this.selectedemployee = new employee()
    // find the student in the student array
    const index = this.employees.findIndex((s:any) => s.id === Employee.id)
    if (index >= 0) this.employees.splice(index, 1)

    // this.refreshTable()
  }

  handleReset (employee:employee) { // StudentForm emits a student when an existing student fails to delete in the api
    // issue happened with delete - so reload students
    this.refreshTable()
  }

  handleCancel () { // StudentForm emits that the cancel button was clicked
    // do nothing at this point
  }
}

</script>

<style scoped>

</style>
