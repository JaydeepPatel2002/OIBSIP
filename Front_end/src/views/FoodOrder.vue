<template>
  <div class="text-left">
    <div class="row">
      <h1 class="col-lg-8">Food Orders:</h1>
      <h5>after selecting item in the list, press<strong>"select to edit"</strong> button</h5>
      <!-- SEARCH : when user selects student from search list then call the b-table selectRow function-->
      <AutoSearch class="col-lg-4 pl-lg-0 mb-2" min-search-length="3" @selected="handleSelect" @busy="setBusy" />
    </div>
    <div class="row">
      <FoodOrderForm class="col-md-6 col-lg-4 order-md-1 pl-lg-0 " debug
                     :food-order="selectedFoodOrder" :disabled="isDisabled" @busy="setBusy"
                     @added="handleAdd" @updated="handleUpdate" @deleted="handleDelete"
                     @cancelled="handleCancel" @reset="handleReset" />

      <!--      <div v-for="food in provider" :key="id">-->
      <!--        <h1>nasucnaius</h1>-->
      <!--        <div>-->
      <!--          <b-card :title="food.CustomerName" sub-title="Card subtitle">-->
      <!--            <b-card-text>-->
      <!--              Some quick example text to build on the <em>card title</em> and make up the bulk of the card's-->
      <!--              content.-->
      <!--            </b-card-text>-->

      <!--            <b-card-text>A second paragraph of text in the card.</b-card-text>-->

      <!--            <a href="#" class="card-link">Card link</a>-->
      <!--            <b-link href="#" class="card-link">Another link</b-link>-->
      <!--          </b-card>-->
      <!--        </div>-->
      <!--      </div>-->
      <b-overlay :show="isDisabled" opacity=".25" class="col-md-6 col-lg-8 order-md-0">

        <b-table :dark="true" ref="FoodOrderTable" responsive
                 :items="provider" :fields="fields" :api-url="FOODORDER_API" @row-clicked="selectedFoodOrder=$event"
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
import { Component, Mixins } from 'vue-property-decorator'
import { BTable, BvTableCtxObject } from 'bootstrap-vue/src/components/table'
import { GlobalMixin } from '@/mixins/global-mixin'
import AutoSearch from '@/components/AutoSearch.vue'
import FoodOrderForm from '@/components/FoodOrderForm.vue'
import { FoodOrder } from '../../../Back_end/src/entity/FoodOrder'
import Employeeform from '@/components/employeeform.vue'

// this our TypeScript Component Class instead of the less friendly  JS class
@Component({
  components: { Employeeform, FoodOrderForm, AutoSearch }
})
export default class FoodOrderView extends Mixins(GlobalMixin) {
  $refs!: {
    FoodOrderTable: BTable
  }

  provider (ctx:BvTableCtxObject):Promise<any> {
    // return fetch('' + ctx.apiUrl).then(res => res.json())
    return this.callAPI('' + ctx.apiUrl)
  }

  // data variable
  selectedFoodOrder:FoodOrder = new FoodOrder()

  // computed from b-table localItems
  get FoodOrders () {
    return this.$refs.FoodOrderTable.localItems
  }

  fields=[
    { key: 'id', sortable: true },
    { key: 'CustomerName', sortable: true },
    { key: 'burger', sortable: true },
    { key: 'Drink', sortable: true },
    { key: 'SideItem', sortable: true },
    { key: 'AdditionalNote', sortable: true },
    { key: 'price', sortable: true }
  ]

  // region METHODS

  selectRow (item:any) {
    if (!item.id) return
    console.log('selectRow')
    console.log(item)
    this.$refs.FoodOrderTable.selectRow(this.FoodOrders.findIndex((i:any) => i.id === item.id))
  }

  refreshTable () {
    console.log('refresh table called')
    this.$refs.FoodOrderTable.refresh()
  }

  handleSelect (foodorder:FoodOrder) {
    console.log('handle select callled')
    console.log(foodorder)
    this.selectRow(foodorder)
    this.selectedFoodOrder = foodorder
  }

  handleAdd (foodorder:FoodOrder) { // StudentForm emits a student when a new student returns from the api
    console.log('handle add called')
    console.log(foodorder)
    this.FoodOrders.unshift(foodorder)
    this.handleSelect(foodorder)
  }

  handleUpdate (foodorder:FoodOrder) { // StudentForm emits a student when an existing student is updated in the api
    console.log(this.selectedFoodOrder)
    Object.assign(this.selectedFoodOrder, foodorder) // update the values in the selectedStudent to the updated values
  }

  handleDelete (foodorder:FoodOrder) { // StudentForm emits a student when an existing student is deleted in the api
    this.selectedFoodOrder = new FoodOrder()
    // find the student in the student array
    const index = this.FoodOrders.findIndex((s:any) => s.id === foodorder.id)
    if (index >= 0) this.FoodOrders.splice(index, 1)

    // this.refreshTable()
  }

  handleReset (foodorder:FoodOrder) { // StudentForm emits a student when an existing student fails to delete in the api
    // issue happened with delete - so reload students
    this.refreshTable()
  }

  handleCancel () { // StudentForm emits that the cancel button was clicked
    // do nothing at this point
  }
}
</script>

<style>
body{
  background: url('../assets/background.jpg') repeat fixed;
  opacity: 125%;

}
</style>
