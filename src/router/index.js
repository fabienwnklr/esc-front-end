import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/tournaments',
    name: 'tournaments',
    component: () => import('../views/Tournaments.vue')
  },
  {
    path: '/new-tournament',
    name: 'new-tournament',
    component: () => import('../views/CreateTournament.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/live',
    name: 'live',
    component: () => import('../views/Live.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/Contact.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/back-office/App.vue'),
    meta: {
      requiresAuth: true,
      is_admin: true
    }
  },
  {
    path: '/admin/new-platform',
    name: 'new-platform',
    component: () => import('../views/back-office/views/NewPlatform.vue'),
    meta: {
      requiresAuth: true,
      is_admin: true
    }
  },
  {
    path: '/admin/new-game',
    name: 'new-game',
    component: () => import('../views/back-office/views/NewGame.vue'),
    meta: {
      requiresAuth: true,
      is_admin: true
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      let user = JSON.parse(localStorage.getItem('user'))
      if (to.matched.some(record => record.meta.is_admin)) {
        if (user.is_admin == 1) {
          next()
        }
        else {
          next({ name: 'home' })
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
      next({ name: 'home' })
    }
  } else {
    next()
  }
})

export default router
