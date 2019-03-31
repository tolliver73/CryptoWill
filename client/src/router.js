import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Login from './views/Login.vue'
import SignUp from './views/SignUp.vue'
import ManageWill from './views/ManageWill.vue'
import Contacts from './views/Contacts.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/will',
      name: 'will',
      component: ManageWill
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts
    }
  ]
})
