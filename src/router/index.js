import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import FindProperty from '../views/FindProperty.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Reservation from '../views/Reservation.vue'
import Dashboard from '../views/Dashboard.vue'
import RentedProperties from '../views/RentedProperties.vue'
import Account from '../views/Account.vue'
import Settings from '../views/Settings.vue'
import Applications from '../views/Applications.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/FindProperty',
    name: 'FindProperty',
    component: FindProperty
  },
  {
    path: '/About',
    name: 'About',
    component: About
  },
  {
    path: '/Reservation',
    name: 'Reservation',
    component: Reservation
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/RentedProperties',
    name: 'RentedProperties',
    component: RentedProperties
  },
  {
    path: '/Account',
    name: 'Account',
    component: Account
  },
  {
    path: '/Settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/Applications',
    name: 'Applications',
    component: Applications
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
