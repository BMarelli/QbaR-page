import Vue from 'vue'
import VueRouter from 'vue-router'
import Table from '../views/Table.vue'
import SearchTable from '../views/SearchTable.vue'
import ControlTable from '../views/ControlTable.vue'
import Admin from '../views/Admin.vue'
import Login from '../views/Login.vue'
import { auth } from '../fb.js'

const GuestTableLayout = () => import("@/layouts/GuestTableLayout.vue");
const GuestLayout = () => import("@/layouts/GuestLayout.vue");
const UserLayout = () => import("@/layouts/UserLayout.vue");

const dev = false;
const link = dev ? "http://localhost:3000" : "https://qbar.herokuapp.com"

Vue.use(VueRouter)

const requiereEnabled = async (to, from, next) => {
  const body = { "id": to.params.id }
  await fetch(`${link}/api/valid/mesa`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(res => res.json().then(data => {
    if (data.estado) next()
    else next('/')
  })).catch(err => { console.log(err); next('/') })
}

const requireAuth = async (to, from, next) => {
  let user = await auth.getCurrentUser()
  if (user) next()
  else next("/api/login")
}

const requireAdmin = async (to, from, next) => {
  let user = await auth.getCurrentUser()
  await fetch(`${link}/api/admin`, {
    method: "POST",
    body: JSON.stringify({ "id": user.uid }),
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(res => res.json().then(data => {
    if (data.admin) next()
    else next('/api/login')
  })).catch(err => { console.log(err); next('/api/login') })
}

const routes = [
  {
    path: '/',
    name: 'SearchTable',
    component: SearchTable,
    meta: {
      layout: GuestLayout
    },
  },
  {
    path: '/mesa/:id',
    name: 'Table',
    component: Table,
    props: true,
    meta: {
      layout: GuestTableLayout
    },
    beforeEnter: requiereEnabled
  },
  {
    path: '/admin/control',
    name: 'ControlTable',
    component: ControlTable,
    meta: {
      layout: UserLayout
    },
    beforeEnter: requireAuth
  },
  {
    path: '/admin/mesas',
    name: 'Admin',
    component: Admin,
    meta: {
      layout: UserLayout
    },
    beforeEnter: requireAdmin
  },
  {
    path: '/api/login',
    name: 'Login',
    component: Login,
    meta: {
      layout: GuestLayout
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
