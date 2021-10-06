import { createRouter, createWebHistory } from "vue-router";
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
      component: LoginPage
    },
    {
      path: '/',
      name: 'parent',
      component: Parent,
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: Dashboard
        },
        {
          path: 'account',
          name: 'account',
          component: AkunIndex
        }
      ]
    }
  ]
});

export default router;
