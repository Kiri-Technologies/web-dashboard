import { createRouter, createWebHistory } from "vue-router";
import store from './store/store.js';
import LoginPage from './pages/LoginPage.vue';
import Parent from './pages/Parent.vue';
import Dashboard from './pages/inside/Dashboard.vue';
import ProfileIndex from './pages/inside/akun/ProfileIndex.vue';
import ManageAccountIndex from './pages/inside/manageaccount/ManageAccountIndex.vue';
import AccountForm from './pages/inside/manageaccount/AccountForm.vue';
import TrayekIndex from './pages/inside/trayekangkot/TrayekIndex.vue';
import WriteTrayek from './pages/inside/trayekangkot/WriteTrayek.vue';
import TrayekDetail from './pages/inside/trayekangkot/TrayekDetail.vue'
import WriteHalteVirtual from './pages/inside/haltevirtual/WriteHalteVirtual.vue';
import AngkotIndex from './pages/inside/angkot/AngkotIndex.vue';
import DetailAngkot from './pages/inside/angkot/DetailAngkot.vue'
import FeedbackAppIndex from './pages/inside/feedbackapp/FeedbackAppIndex.vue'

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
        },
        {
          path: '/trayekangkot',
          name: 'trayek angkot',
          component: TrayekIndex,
          meta: {
            auth: true
          }
        },
        {
          path: '/trayekangkot/create',
          name: 'create new trayek',
          component: WriteTrayek,
          meta: {
            auth: true
          }
        },
        {
          path: '/trayekangkot/:id/update',
          name: 'update trayek',
          component: WriteTrayek,
          props: true,
          meta: {
            auth: true
          }
        },
        {
          path: '/trayekangkot/:id/detail',
          name: 'detail trayek',
          component: TrayekDetail,
          props: true,
          meta: {
            auth: true
          }
        },
        {
          path: '/haltevirtual/:trayekid/create',
          name: 'create halte virtual',
          component: WriteHalteVirtual,
          props: true,
          meta: {
            auth: true
          }
        },
        {
          path: '/haltevirtual/:trayekid/:id/update',
          name: 'update halte virtual',
          component: WriteHalteVirtual,
          props: true,
          meta: {
            auth: true
          }
        },
        {
          path: '/angkot',
          name: 'angkot index',
          component: AngkotIndex,
          meta: {
            auth: true
          }
        },
        {
          path: '/angkot/detail',
          name: 'detail angkot',
          component: DetailAngkot,
          meta: {
            auth: true
          }
        },
        {
          path: '/feedbackapp',
          name: 'feedback aplikasi',
          component: FeedbackAppIndex,
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

router.beforeEach(function (to, _, next) {
  if (to.meta.auth && !store.getters['auth/isAuthenticated']) {
    next('/login');
  } else if (to.meta.noAuth && store.getters['auth/isAuthenticated']) {
    console.log()
    next('/');
  } else {
    next()
  }
});

export default router;
