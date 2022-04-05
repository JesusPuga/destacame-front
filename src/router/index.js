import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
import DriversList from '@/components/DriversList'
import BusList from '@/components/BusList'
import PassengerList from '@/components/PassengerList'
import TravelList from '@/components/TravelList'
import TravelPlanList from '@/components/TravelPlanList'
import TravelSaleList from '@/components/TravelSaleList'
import Dashboard from '@/components/Dashboard'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/tablero',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/conductores',
    name: 'DriversList',
    component: DriversList
  },
  {
    path: '/autobuses',
    name: 'BusList',
    component: BusList
  },
  {
    path: '/pasajeros',
    name: 'PassengerList',
    component: PassengerList
  },
  {
    path: '/trayectos',
    name: 'TravelPlanList',
    component: TravelPlanList
  },
  {
    path: '/trayectos/:plan_id/horarios/',
    name: 'TravelList',
    component: TravelList
  },
  {
    path: '/trayectos/:plan_id/horarios/:id/pasajeros',
    name: 'TraveSaleList',
    component: TravelSaleList
  }
]

const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
  let isAuthenticated = localStorage.getItem('token')

  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else if (to.name === 'Login' && isAuthenticated) next({ name: 'Dashboard' })
  else next()
})
export default router
