// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Header from './components/Header'
import DriverForm from './components/DriverForm'
import BusForm from './components/BusForm'
import PassengerForm from './components/PassengerForm'
import TravelForm from './components/TravelForm'
import TravelPlanForm from './components/TravelPlanForm'
import TraveSaleForm from './components/TravelSaleForm'
import Modal from './components/Modal'
import router from './router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)
Vue.component('header-view', Header)
Vue.component('driver-form', DriverForm)
Vue.component('bus-form', BusForm)
Vue.component('passenger-form', PassengerForm)
Vue.component('travel-form', TravelForm)
Vue.component('travel-plan-form', TravelPlanForm)
Vue.component('travel-sale-form', TraveSaleForm)
Vue.component('modal-general', Modal)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App, Header },
  template: '<App/>'
})
