import Vue from 'vue'
import VueRouter from 'vue-router'
import { EventBus } from '../bus/eventBus';

import store from '../store'

// Layouts
import MainLayout from '@/layouts/MainLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

// Real Estate Views
import LandingPage from '@/views/LandingPage.vue'
import PropertyListing from '@/views/PropertyListing.vue'
import PropertyDetail from '@/views/PropertyDetail.vue'
import InsuranceCompanies from '@/views/InsuranceCompanies.vue'
import Login from '@/views/Login.vue'
import AdminDashboard from '@/views/AdminDashboard.vue'
import PropertyManagement from '@/views/PropertyManagement.vue'
import InsuranceManagement from '@/views/InsuranceManagement.vue'
import PrivacyPolicy from '@/views/PrivacyPolicy.vue'
import MaintenanceView from '@/views/MaintenanceView.vue'
import QuotesManagement from '@/views/QuotesManagement.vue'

import NotFoundView from '@/views/NotFoundView.vue';

Vue.use(VueRouter)

const publicRoutes = [
  'home',
  'landing',
  'propertyListing',
  'propertyDetail',
  'insuranceCompanies',
  'login',
  'unauthorized',
  'IndexView',
  'privacyPolicy',
  'maintenance',
  'notFound'
]

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {path: '', name: 'landing', component: LandingPage},
      {path: 'home', redirect: '/'},
      {path: 'properties', name: 'propertyListing', component: PropertyListing},
      {path: 'properties/:id', name: 'propertyDetail', component: PropertyDetail},
      {path: 'insurance', name: 'insuranceCompanies', component: InsuranceCompanies},
      {path: 'privacy-policy', name: 'privacyPolicy', component: PrivacyPolicy},
    ]
  },
  {path: '/maintenance', name: 'maintenance', component: MaintenanceView},
  {path: '/login', name: 'login', component: Login},
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      {path: 'dashboard', name: 'adminDashboard', component: AdminDashboard},
      {path: 'properties', name: 'propertyManagement', component: PropertyManagement},
      {path: 'insurance', name: 'insuranceManagement', component: InsuranceManagement},
      {path: 'quotes', name: 'quotesManagement', component: QuotesManagement},
    ]
  },
  { path: '*', name: 'notFound', component: NotFoundView }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

const checkUserLogin = async () => {
	const isAuth = store.getters['Auth/isUserAuth'];
	const hasToken = store.getters['Auth/userToken'];
	if (!hasToken) return false;
	if (hasToken && !isAuth) {
		return await store.dispatch('Auth/checkUserToken');
	}
	return true;
}

const handlePublicRoutes = async (to, from, next) => {
	return next();
}

const handlePrivateRoutes = async (to, from, next, isLogedIn) => {
	if (!isLogedIn) return next({ name: 'login' });
	return next();
};

router.beforeEach(async (to, from, next) => {
  const maintenanceMode = process.env.VUE_APP_MAINTENANCE_MODE === 'true'

  if (maintenanceMode && to.name !== 'maintenance') {
    return next({ name: 'maintenance' })
  }

  if (!maintenanceMode && to.name === 'maintenance') {
    return next({ name: 'landing' })
  }

  const isPublicRoute = publicRoutes.includes(to.name)
  if (isPublicRoute) return await handlePublicRoutes(to, from, next);
  if (to.meta.requiresAuth) {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
    
    if (!isAuthenticated) {
      return next({ name: 'login' })
    }
  }
  
  // Verificar autenticación del sistema original
  const isLogedIn = await checkUserLogin();
  EventBus.$emit('close-sidebar');
  
  // Si no tiene roles definidos pero requiere auth, dejar pasar
  if (to.meta.requiresAuth && !to.meta.roles) {
    return next();
  }
  
  return await handlePrivateRoutes(to, from, next, isLogedIn);
});

export default router
