import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)


const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        breadcrumb: 'Login',
      },
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        breadcrumb: 'Inicio',
        requiresAuth: false
      },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      meta: {
        breadcrumb: 'About',
        requiresAuth: true
      },
    },
    {
      path: '/users',
      name: 'users',
      component: () => import(/* webpackChunkName: "about" */ './views/Users.vue'),
      meta: {
        breadcrumb: 'Usuarios',
        requiresAuth: false
      },
    },
    {
      path: '/user/:id',
      name: 'user',
      component: () => import(/* webpackChunkName: "about" */ './views/UserView.vue'),
      meta: {
        breadcrumb: 'Usuarios',
        requiresAuth: false
      },
      redirect: '/users',
      children: [
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          path: 'view',
          name: 'view',
          meta: {
            breadcrumb: 'Vista',
            requiresAuth: false
          },
          // component: () => import(/* webpackChunkName: "about" */ './views/Users.vue'),
        }
      ]
    },
    {
      // will match everything
      path: '*',
      component: () => import(/* webpackChunkName: "about" */ './views/NotFound.vue')
    },
    {
      path: '/formulario',
      name: 'formulario',
      meta: {
        breadcrumb: 'Formulario',
        requiresAuth: true
      },
      component: () => import(/* webpackChunkName: "about" */ './views/Formulario.vue'),
    }
  ],
})

router.beforeEach((to, from, next) => {
  // console.log(to.matched.some(record => record.meta.requiresAuth));
  console.log(localStorage);
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      // let user = JSON.parse(localStorage.getItem('user'))
      // console.log(localStorage);
      
      let user = {is_admin: 1}
      if (to.matched.some(record => record.meta.is_admin)) {
        if (user.is_admin == 1) {
          next()
        }
        else {
          next({ name: 'userboard' })
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('jwt') == null) {
      next()
    }
    else {
      next({ name: 'userboard' })
    }
  } else {
    next()
  }
})



export default router