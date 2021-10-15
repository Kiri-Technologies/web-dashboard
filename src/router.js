import { createRouter, createWebHistory } from "vue-router";
import store from './store/store.js';
import LoginPage from './pages/LoginPage.vue';
import Parent from './pages/Parent.vue';
import Dashboard from './pages/inside/Dashboard.vue';
import AkunIndex from './pages/inside/akun/AkunIndex.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'loginPage',
      component: LoginPage,
      meta: {
        noAuth: true
      }
    },
    {
      path: '/',
      name: 'parent',
      component: Parent,
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: Dashboard,
          meta: {
            auth: true
          }
        },
        {
          path: 'account',
          name: 'account',
          component: AkunIndex,
          meta: {
            auth: true
          }
        }
      ]
    }
  ]
});

router.beforeEach(function(to, _, next){
  if (to.meta.auth && !store.getters['auth/isAuthenticated']) { 
    next('/login');
  }else if(to.meta.noAuth && store.getters['auth/isAuthenticated']){
    console.log()
    next('/');
  }else {
    next()
  }
});

export default router;
