import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignIn from '../views/Signin.vue'
import SignUp from '../views/Signup.vue'
import MyProducts from '../views/Myproducts.vue'
import ProDucts from '../views/Products.vue'
import firebase from '../Firebase'
Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/products',
      name: 'ProDucts',
      component: ProDucts,
      meta: { requiresAuth: true },
    },
    {
      path: '/myproducts',
      name: 'MyProducts',
      component: MyProducts,  
      meta: { requiresAuth: true },
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  ]
  
})

router.beforeEach((to, from, next) => {

  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = firebase.auth().currentUser

  if (requiresAuth && !currentUser) {
      next('/signin')
  } else if (requiresAuth && currentUser) {
      next()
  } else {
      next()
  }
})
export default router