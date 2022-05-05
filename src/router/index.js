import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Vue.use(VueRouter);

const routes = [
	{
		path: '*',
		name: 'NotFound',
		component: () => import('@/views/error/404.vue')
	},
	{
		path: '/',
		name: 'home',
		meta: {
			title: 'Accueil',
			icon: 'mdi-home'
		},
		component: () => import('@/views/Home.vue')
	},
	{
		path: '/about',
		name: 'about',
		meta: {
			title: 'A propos',
			icon: ''
		},
		component: () => import('@/views/About.vue')
	},
	{
		path: '/tournaments',
		name: 'tournaments',
		meta: {
			title: 'Tournois',
			icon: 'mdi-trophy'
		},
		component: () => import('@/views/TournamentList.vue')
	},
	{
		path: '/tournament/:id',
		name: 'tournament-details',
		component: () => import('@/views/TournamentDetails.vue')
	},
	{
		path: '/new-tournament',
		name: 'new-tournament',
		component: () => import('@/views/CreateTournament.vue'),
		meta: {
			title: 'Créer un tournoi',
			icon: 'mdi-new-box',
			requiresAuth: true
		}
	},
	{
		path: '/live',
		name: 'live',
		meta: {
			title: 'Live',
			icon: 'mdi-twitch'
		},
		component: () => import('@/views/Live.vue')
	},
	{
		path: '/profil',
		name: 'profil',
		component: () => import('@/views/Account.vue'),
		meta: {
			title: 'Mon profil',
			icon: 'mdi-account',
			requiresAuth: true
		}
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/Login.vue'),
		meta: {
			title: 'Se connecter',
			icon: 'mdi-power-standby',
			guest: true
		}
	},
	{
		path: '/register',
		name: 'register',
		component: () => import('@/views/Register.vue'),
		meta: {
			title: "S'inscrire",
			icon: 'mdi-account-plus',
			guest: true
		}
	},
	{
		path: '/contact',
		name: 'contact',
		component: () => import('@/views/Contact.vue')
	},
	{
		path: '/admin',
		component: () => import('@/views/admin/Index.vue'),
		redirect: '/admin/dashboard',
		meta: {
			title: "Console d'administrateur",
			icon: 'mdi-shield-account-outline',
			requiresAuth: true,
			is_admin: true
		},
		children: [
			{
				path: '/admin/dashboard',
				name: 'dashboard',
				meta: {
					title: 'Tableau de bord',
					icon: 'mdi-view-dashboard'
				},
				component: () => import('@/views/admin/Dashboard.vue')
			},
			{
				path: 'users',
				name: 'Users',
				meta: {
					title: 'Utilisateurs',
					icon: 'mdi-account-group'
				},
				component: () => import('@/components/admin/layout/ManageUsers.vue')
			},
			{
				path: 'game',
				name: 'Game',
				meta: {
					title: 'Jeux',
					icon: 'mdi-gamepad-variant'
				},
				component: () => import('@/components/admin/layout/ManageGames.vue')
			},
			{
				path: 'tournaments',
				name: 'Tournaments',
				meta: {
					title: 'Tournois',
					icon: 'mdi-trophy'
				},
				component: () => import('@/components/admin/layout/ManageTournaments.vue')
			},
			{
				path: 'games-mode',
				name: 'Games mode',
				meta: {
					title: 'Mode de jeux',
					icon: 'mdi-clipboard-list'
				},
				component: () => import('@/components/admin/layout/ManageGamesMode.vue')
			},
			{
				path: 'platforms',
				name: 'Platforms',
				meta: {
					title: 'Platformes',
					icon: 'mdi-desktop-classic'
				},
				component: () => import('@/components/admin/layout/ManagePlatforms.vue')
			}
		]
	}
];

const router = new VueRouter({
	mode: 'hash',
	linkActiveClass: 'active',
	routes
});

router.beforeEach((to, from, next) => {
	NProgress.start();
	const userItem = localStorage.getItem('user');
	let user = userItem !== null ? JSON.parse(userItem) : undefined;
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (localStorage.getItem('jwt') == null) {
			next({
				path: '/login',
				params: {
					nextUrl: to.fullPath
				}
			});
		} else {
			if (to.matched.some(record => record.meta.is_admin)) {
				if (user !== 'undefined' && user.is_admin == 1) {
					next();
				} else {
					next({
						name: 'home'
					});
				}
			} else {
				next();
			}
		}
	} else if (to.matched.some(record => record.meta.guest)) {
		if (localStorage.getItem('jwt') == null) {
			next();
		} else {
			next({
				name: 'home'
			});
		}
	} else {
		next();
	}
});

router.afterEach(() => {
	NProgress.done();
});

export default router;
