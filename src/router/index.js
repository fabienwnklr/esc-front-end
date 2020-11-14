import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'NotFound',
    component: () => import('../views/error/404.vue')
  },
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
    component: () => import('../views/TournamentList.vue')
  },
  {
    path: '/tournament/:id',
    name: 'tournament-details',
    component: () => import('../views/TournamentDetails.vue')
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
    path: '/profil',
    name: 'profil',
    component: () => import('../views/Account.vue')
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
    component: () => import('../views/admin/Index.vue'),
    meta: {
      requiresAuth: true,
      is_admin: true
    }
  },

]

const router = new VueRouter({
  mode: 'hash',
  routes
})



router.beforeEach((to, from, next) => {
  const userItem = localStorage.getItem('user')
  let user = userItem !== null ? JSON.parse(userItem) : undefined;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // ? TODO : Appeler la requête checkToken ici
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: {
          nextUrl: to.fullPath
        }
      })
    } else {
      if (to.matched.some(record => record.meta.is_admin)) {
        if (user !== 'undefined' && user.is_admin == 1) {
          next()
        } else {
          next({
            name: 'home'
          })
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('jwt') == null) {
      next()
    } else {
      next({
        name: 'home'
      })
    }
  } else {
    next()
  }
})

export default router
