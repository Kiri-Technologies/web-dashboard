import { createRouter, createWebHistory } from "vue-router";
import store from './store/store.js';
import LoginPage from './pages/LoginPage.vue';
import Parent from './pages/Parent.vue';
import Dashboard from './pages/inside/Dashboard.vue';
import ProfileIndex from './pages/inside/akun/ProfileIndex.vue';
import ManageAccountIndex from './pages/inside/manageaccount/ManageAccountIndex.vue';
import AccountForm from './pages/inside/manageaccount/AccountForm.vue';

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
          component: ProfileIndex,
          meta: {
            auth: true
          }
        },
        {
          path: '/manageaccount',
          name: 'manage account',
          component: ManageAccountIndex,
          props: route => ({
            c: route.query.c,
            d: route.query.d,
            u: route.query.u
          }),
          meta: {
            auth: true
          }
        },
        {
          path: '/manageaccount/create',
          name: 'create new account',
          component: AccountForm,
          meta: {
            auth: true
          }
        },
        {
          path: '/manageaccount/:id/update',
          name: 'update admin account',
          component: AccountForm,
          props: true,
          meta: {
            auth: true
          }
        }
      ]
    }
  ],
  linkExactActiveClass: 'active',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }

        return {
            top: 0,
            left: 0
        }
    }
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
