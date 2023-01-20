<template>
  <div>
    <!-- Customer name -->
    <!--    invalid-feedback prop is bound to the data variable object 'violation' and its familyName attribute
        hasErr prop is bound to the computed object 'hasErr' and it's ln attribute-->
    <b-form-group :invalid-feedback="violation.CustomerName" :has-err="hasErr.cN" class="mb-1">
      <b-input-group>
        <!--    tooltip hovers to the right of the prepend div-->
        <b-input-group-prepend is-text v-b-tooltip.hover.right="dt.cN">
          <!--    add icon to left of input box and the title attribute is bound to the data variable object 'dt' and its ln attribute-->
          <b-icon-person-fill :title="dt.cN" />
        </b-input-group-prepend>
        <!--    form input, placeholder attribute bound to data variable object 'dt' and its ln attribute
                disabled prop is bound to computed property isDisabled
                value of form input is 2-way bound to the data variable object 'tempStudent' and its familyName attribute
                trim directive removes white space at start or end of user entry
                when a key is pressed down the violation message for the field is cleared thus hiding the violation from the user
                -->
        <b-form-input :placeholder="dt.cN" :has-err="hasErr.cN" :disabled="isDisabled"
                      v-model="tempFoodOrder.CustomerName" trim @keydown="violation.CustomerName = null" />
      </b-input-group>
    </b-form-group>
    <!--    temp try for burger ADDRESS -->
    <b-form-group class="mb-1">
      <b-input-group>

        <b-form-select v-model="SelectedBurger" @change="UpdateTotal" title="choose your burger" :options="BurgerOptions"></b-form-select>
        <!--        <b-form-input :placeholder="dt.sA" :has-err="hasErr.sA" :disabled="true"-->
        <!--                      v-model="SelectedBurger.name" trim @keydown="violation.address=null" />-->
        <!--        <b-form-input :placeholder="dt.sA" id="pri" :has-err="hasErr.sA" :disabled="true"-->
        <!--                      v-model="SelectedBurger.price" trim @keydown="violation.address=null" />-->
      </b-input-group>
    </b-form-group>

    <!-- Burger NAME -->
    <b-form-group :invalid-feedback="violation.burger" :has-err="hasErr.bN" class="mb-1">
      <b-input-group>
        <b-input-group-prepend is-text v-b-tooltip.hover.right="dt.bN">
          <b-icon-hdd-rack :title="dt.bN" />
        </b-input-group-prepend>
        <b-form-input :placeholder="dt.bN" :has-err="hasErr.bN" :disabled="isDisabled"
                      v-model="tempFoodOrder.burger" trim @keydown="violation.burger=null" />
      </b-input-group>
    </b-form-group>

    <!--    temp try for burger ADDRESS -->
    <b-form-group class="mb-1">
      <b-input-group>

        <b-form-select v-model="SelectedDrink" @change="UpdateTotal" title="choose your drinks" :options="DrinkOptions"></b-form-select>
        <!--        <b-form-input :placeholder="dt.sA" :has-err="hasErr.sA" :disabled="true"-->
        <!--                      v-model="SelectedBurger.name" trim @keydown="violation.address=null" />-->
        <!--        <b-form-input :placeholder="dt.sA" id="pri" :has-err="hasErr.sA" :disabled="true"-->
        <!--                      v-model="SelectedBurger.price" trim @keydown="violation.address=null" />-->
      </b-input-group>
    </b-form-group>
    <!-- Drink NAME -->
    <b-form-group :invalid-feedback="violation.Drink" :has-err="hasErr.dN" class="mb-1">
      <b-input-group>
        <b-input-group-prepend is-text v-b-tooltip.hover.right="dt.dN">
          <b-icon-trash2 :title="dt.dN" />
        </b-input-group-prepend>
        <b-form-input :placeholder="dt.dN" :has-err="hasErr.dN" :disabled="isDisabled"
                      v-model="tempFoodOrder.Drink" trim @keydown="violation.Drink=null" />
      </b-input-group>
    </b-form-group>

    <!--    temp try for burger ADDRESS -->
    <b-form-group class="mb-1">
      <b-input-group>

        <b-form-select v-model="SelectedSideItem" @change="UpdateTotal" title="choose your side items" :options="SideItemOptions"></b-form-select>
        <!--        <b-form-input :placeholder="dt.sA" :has-err="hasErr.sA" :disabled="true"-->
        <!--                      v-model="SelectedBurger.name" trim @keydown="violation.address=null" />-->
        <!--        <b-form-input :placeholder="dt.sA" id="pri" :has-err="hasErr.sA" :disabled="true"-->
        <!--                      v-model="SelectedBurger.price" trim @keydown="violation.address=null" />-->
      </b-input-group>
    </b-form-group>
    <!-- SideItem NAME -->
    <b-form-group :invalid-feedback="violation.SideItem" :has-err="hasErr.sN" class="mb-1">
      <b-input-group>
        <b-input-group-prepend is-text v-b-tooltip.hover.right="dt.sN">
          <b-icon-basket2 :title="dt.sN" />
        </b-input-group-prepend>
        <b-form-input :placeholder="dt.sN" :has-err="hasErr.sN" :disabled="isDisabled"
                      v-model="tempFoodOrder.SideItem" trim @keydown="violation.SideItem=null" />
      </b-input-group>
    </b-form-group>

    <!-- AdditionalNote NAME -->
    <b-form-group :invalid-feedback="violation.AdditionalNote" :has-err="hasErr.aN" class="mb-1">
      <b-input-group>
        <b-input-group-prepend is-text v-b-tooltip.hover.right="dt.aN">
          <b-icon-pencil-square :title="dt.aN" />
        </b-input-group-prepend>
        <b-form-input :placeholder="dt.aN" :has-err="hasErr.aN" :disabled="isDisabled"
                      v-model="tempFoodOrder.AdditionalNote" trim @keydown="violation.AdditionalNote=null" />
      </b-input-group>
    </b-form-group>

    <!-- price -->
    <b-form-group :invalid-feedback="violation.price" :has-err="hasErr.p" class="mb-1">
      <b-input-group>
        <b-input-group-prepend is-text v-b-tooltip.hover.right="dt.p">
          <b-icon-chevron-right :title="dt.p" />
        </b-input-group-prepend>
        <b-form-input :placeholder="dt.p" :has-err="hasErr.p" :disabled="isDisabled"
                      v-model="tempFoodOrder.price" trim @keydown="violation.price=null" />
      </b-input-group>
    </b-form-group>

    <!-- BUTTONS -->
    <b-button-group class="w-100 mb-3">
      <!--    save button,  onclick call the saveStudent function
        disabled prop is bound to the computed property 'isDisabled' -->
      <b-button variant="primary" :disabled="isDisabled" @click="saveFoodOrder">
        <!--    use a cloud icon, add a ref (reference) to this icon as 'iconSave' so we can animate it when saveStudent is called
            https://vuejs.org/v2/api/#ref -->
        <b-icon-cloud-arrow-up-fill ref="iconSave" /> Save</b-button>
      <b-button variant="danger" :disabled="isDisabled || isNew" @click="deleteConfirm">
        <!--    use a trash icon, add a ref (reference) to this icon as 'iconDelete' so we can animate it when deleteStudent is called
            https://vuejs.org/v2/api/#ref -->
        <b-icon-trash-fill ref="iconDelete" /> Delete</b-button>
    </b-button-group>
    <b-button-group class="w-100 mb-3">
      <b-button variant="primary" :disabled="isDisabled" @click="cancel">
        <b-icon-x-square-fill /> Cancel</b-button>
      <b-button variant="primary" :disabled="isDisabled" @click="select">
        <b-icon icon="exclamation-circle" /> select to edit</b-button>
    </b-button-group>

    <!-- DELETE CONFIRM -- show hide the modal using the showConfirmDelete data variable as a model -->
    <b-modal title="Delete FoodOrder" ok-variant="danger" cancel-variant="primary"
             @ok="deleteFoodOrder" v-model="showConfirmDelete">
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
      Are you sure you want to delete {{tempFoodOrder.id}}, {{tempFoodOrder.CustomerName}}?
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
import { BIcon } from 'bootstrap-vue'

import { FoodOrder } from '../../../Back_end/src/entity/FoodOrder'

@Component
export default class FoodOrderForm extends Mixins(GlobalMixin) {
  SelectedBurger: any;
  SelectedDrink: any;
  SelectedSideItem: any;
  data () {
    return {
      selected: null,
      tempFoodOrder: {
        CustomerName: '',
        burger: '',
        Drink: '',
        SideItem: '',
        AdditionalNote: '',
        price: 0.0
      },
      SelectedBurger: { name: 'choose your burger', price: 0.0 },
      SelectedDrink: { name: 'choose your drink', price: 0.0 },
      SelectedSideItem: { name: 'choose your side item', price: 0.0 },

      BurgerOptions: [

        { value: { name: 'Big Mac', price: 5.69 }, text: 'Big Mac\t$5.69' },
        { value: { name: 'Double Big Mac', price: 7.19 }, text: 'Double Big Mac\t$7.19' },
        { value: { name: 'Big Mac, No Meat', price: 4.19 }, text: 'Big Mac, No Meat\t$4.19' },
        { value: { name: 'Quarter Pounder With Cheese', price: 5.69 }, text: 'Quarter Pounder With Cheese\t$5.69' },
        { value: { name: 'Double Quarter Pounder With Cheese', price: 7.19 }, text: 'Double Quarter Pounder With Cheese\t$7.19' },
        { value: { name: 'Quarter Pounder BLT', price: 6.09 }, text: 'Quarter Pounder BLT\t$6.09' },
        { value: { name: 'Double Quarter Pounder BLT', price: 7.49 }, text: 'Double Quarter Pounder BLT\t$7.49' },
        { value: { name: 'Quarter Pounder Without Cheese', price: 5.19 }, text: 'Quarter Pounder Without Cheese\t$5.19' },
        { value: { name: 'Cheeseburger', price: 1.89 }, text: 'Cheeseburger\t$1.89' },
        { value: { name: 'Double Cheeseburger', price: 2.39 }, text: 'Double Cheeseburger\t$2.39' },
        { value: { name: 'Hamburger', price: 1.69 }, text: 'Hamburger\t$1.69' },
        { value: { name: 'Double Hamburger', price: 1.99 }, text: 'Double Hamburger\t$1.99' },
        { value: { name: 'McDouble', price: 2.29 }, text: 'McDouble\t$2.29' },
        { value: { name: 'Mighty Angus Range Carolina BBQ Angus', price: 7.49 }, text: 'Mighty Angus Range Carolina BBQ Angus\t$6.99' }
      ],
      DrinkOptions: [
        { value: { name: 'Med Coca-Cola', price: 2.69 }, text: 'Med Coca-Cola\tCAN$ 2.69' },
        { value: { name: 'Med Caramel Iced Coffee', price: 3.09 }, text: 'Med Caramel Iced Coffee\tCAN$ 3.09' },
        { value: { name: 'Med Diet Coke', price: 2.69 }, text: 'Med Diet Coke\tCAN$ 2.69' },
        { value: { name: 'Med Vanilla Iced Coffee', price: 3.09 }, text: 'Med Vanilla Iced Coffee\tCAN$ 3.09' },
        { value: { name: 'Med Coke Zero', price: 2.69 }, text: 'Med Coke Zero\tCAN$ 2.69' },
        { value: { name: 'Med Sugar Free Vanilla Iced Coffee', price: 3.09 }, text: 'Med Sugar Free Vanilla Iced Coffee\tCAN$ 3.09' },
        { value: { name: 'Med Barq’s Root Beer', price: 2.69 }, text: 'Med Barq’s Root Beer\tCAN$ 2.69' },
        { value: { name: 'Med Apple Juice', price: 2.59 }, text: 'Med Apple Juice\tCAN$ 2.59' },
        { value: { name: 'Med NESTEA Iced Tea', price: 2.69 }, text: 'Med NESTEA Iced Tea\tCAN$ 2.69' },
        { value: { name: '1% Milk Bottle', price: 1.69 }, text: '1% Milk Bottle\tCAN$ 1.69' },
        { value: { name: 'Med Fruitopia Strawberry', price: 2.69 }, text: 'Med Fruitopia Strawberry\tCAN$ 2.69' },
        { value: { name: 'Chocolate Milk Bottle', price: 1.69 }, text: 'Chocolate Milk Bottle\tCAN$ 1.69' },
        { value: { name: 'Med Peach Passionfruit Smoothie', price: 4.39 }, text: 'Med Peach Passionfruit Smoothie\tCAN$ 4.39' },
        { value: { name: 'Med Strawberry Banana Real Fruit Smoothie', price: 4.39 }, text: 'Med Strawberry Banana Real Fruit Smoothie\tCAN$ 4.39' },
        { value: { name: 'Med Mango Pineapple Real Fruit Smoothie', price: 4.39 }, text: 'Med Mango Pineapple Real Fruit Smoothie\tCAN$ 4.39' },
        { value: { name: 'Med Blueberry Pomegranate Real Fruit Smoothie', price: 4.39 }, text: 'Med Blueberry Pomegranate Real Fruit Smoothie\tCAN$ 4.39' }

      ],
      SideItemOptions: [
        { value: { name: 'Fudge Sundae', price: 3.39 }, text: 'Fudge Sundae\tCAN$ 3.39' },
        { value: { name: 'Med Fries', price: 3.99 }, text: 'Med Fries\tCAN$ 3.99' },
        { value: { name: 'Poutine', price: 5.89 }, text: 'Poutine\tCAN$ 5.89' },
        { value: { name: 'Chicken nuggets', price: 2.69 }, text: 'Chicken nuggets\tCAN$ 2.69' },
        { value: { name: 'Nachos', price: 10.95 }, text: 'Nachos\tCAN$ 10.95' },
        { value: { name: 'Boneless Dry ribs', price: 11.95 }, text: 'Boneless Dry ribs\tCAN$ 11.95' },
        { value: { name: 'chicken bites', price: 9.95 }, text: 'chicken bites\tCAN$ 9.95' },
        { value: { name: 'chicken wings', price: 8.65 }, text: 'chicken wings\tCAN$ 8.65' },
        { value: { name: 'potato wedges', price: 4.95 }, text: 'potato wedges\tCAN$ 4.95' },
        { value: { name: 'garlic bread stick', price: 3.95 }, text: 'garlic bread stick\tCAN$ 3.95' },
        { value: { name: 'garlic cheese stick', price: 4.69 }, text: 'garlic cheese stick\tCAN$ 4.69' },
        { value: { name: 'cinnamon stick', price: 5.95 }, text: 'cinnamon stick\tCAN$  5.95' },
        { value: { name: 'Caesar salad', price: 4.95 }, text: 'Caesar salad\tCAN$ 4.95' },
        { value: { name: 'greek salad', price: 4.69 }, text: 'greek salad\tCAN$ 4.69' },
        { value: { name: 'taco salad', price: 6.69 }, text: 'taco salad\tCAN$ 6.69' },
        { value: { name: 'veggie ranch sticks', price: 6.95 }, text: 'veggie ranch sticks\tCAN$ 6.95' }

      ]
    }
  }

  @Prop({ type: Object, validator: s => s instanceof Object }) readonly FoodOrder: any

  $refs!: {
    iconDelete: BIcon
    iconSave: BIcon
  }

  // region DATA VARIABLES
  tempFoodOrder: FoodOrder = new FoodOrder() // will store a copy of the values from the student declared in the props section
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

  saveFoodOrder () {
    const icon: BIcon = this.$refs.iconSave // get the icon to animate from the vue refs https://vuejs.org/v2/api/#ref
    this.setBusy(true)// tell parent that this component is waiting for the api to respond
    this.animate(icon, true)// animate the icon in the clicked button to give the user an indication that some thing is happening
    this.violation = {}// empty out violation messages - to hide violation message from user and wait for new violations from the api

    // use the method declared in the student mixin to call the student api
    // if the student is new POST , if the student already exists then PUT
    const url = this.FOODORDER_API + (this.isNew ? '' : '/' + this.tempFoodOrder.id)
    const method = this.isNew ? 'post' : 'put'

    this.callAPI(url, method, this.tempFoodOrder) // returns a promise object
      .then(data => {
        // determine if the student was added or updated
        this.$emit(this.tempFoodOrder.id === data.id ? 'updated' : 'added', data)
        this.tempFoodOrder = {

          id: null,
          CustomerName: '',
          burger: '',
          Drink: '',
          SideItem: '',
          AdditionalNote: '',
          price: 0.0
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
    this.tempFoodOrder = Object.assign({}, this.FoodOrder)// copy the student values to a new temp student
    this.$emit('cancelled', this.FoodOrder) // tell parent that cancel was called
  }

  select () {
    this.tempFoodOrder = Object.assign({}, this.FoodOrder)
  }

  deleteFoodOrder () {
    const icon:BIcon = this.$refs.iconDelete // get the icon to animate from the vue refs https://vuejs.org/v2/api/#ref
    this.setBusy(true)// tell parent that this component is waiting for the api
    this.animate(icon, true)// animate the icon the clicked button
    this.violation = {}// empty out violation messages
    this.callAPI(this.FOODORDER_API + '/' + this.tempFoodOrder.id, 'delete')
      .then(res => {
        this.tempFoodOrder = {
          id: null,
          CustomerName: '',
          burger: '',
          Drink: '',
          SideItem: '',
          AdditionalNote: '',
          price: 0.0
        }
        this.$emit('deleted', this.FoodOrder)// tell parent student was deleted
      })
      .catch(() => {
        this.$emit('reset', this.FoodOrder)
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

  UpdateTotal () {
    console.log(this.SelectedBurger.name)

    this.tempFoodOrder.burger = this.SelectedBurger.name
    this.tempFoodOrder.Drink = this.SelectedDrink.name
    this.tempFoodOrder.SideItem = this.SelectedSideItem.name
    this.tempFoodOrder.price = (this.SelectedBurger.price + this.SelectedDrink.price + this.SelectedSideItem.price).toFixed(2)
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
    return !this.FoodOrder || !this.FoodOrder.id
  }

  @Watch('student', { deep: true })// watch all attributes of the student object - if any attribute changes then execute the handler
  onStudentChanged (newStu: FoodOrder, oldStu: FoodOrder) { // execute this function when the student object in the props section changes
    if (!newStu || !newStu.id) {
      // if new student is null or doesn't have an id
      this.tempFoodOrder = new FoodOrder()// clear out temporary student
    } else if (!oldStu || newStu.id !== oldStu.id) {
      // if old student is null or new student is not the same as old student
      // COPY VALUES from the student prop into new a temp student object
      this.tempFoodOrder = Object.assign(new FoodOrder(), this.FoodOrder)
    }
    this.violation = {}// empty out violation messages - to hide them from the user
  }
}

</script>

<style scoped>

</style>
