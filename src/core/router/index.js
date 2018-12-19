import Vue from 'vue';
import Router from 'vue-router';
import Routes from './routes';
import auth from '../auth';
import checkRouteAvailable from '../helpers/checkRouteAvailable';

Vue.use(Router);


const routes = [
  {
    path: '/',
    component: () => import('../../components/layouts/MainSkin'),
    children: Routes,
    redirect: Routes.filter(route => checkRouteAvailable(route))[0].path,
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('../../components/Login'),
    meta: { skipAuth: true },
  },

  // Всегда оставляйте это последним
  {
    path: '*',
    component: () => import('../../components/Error'),
    meta: { skipAuth: true },
  },
];


const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes,
});


router.beforeEach((to, from, next) => {
  const authorized = auth.checkAuth();

  if (to.path === '/login' && authorized) {
    return next(from.fullPath);
  }

  if (!to.meta.skipAuth && !authorized) {
    return next({
      path: '/login',
      query: { redirect: to.fullPath },
    });
  }

  if (!checkRouteAvailable(to)) {
    return next(from.fullPath);
  }

  return next();
});


export default router;
