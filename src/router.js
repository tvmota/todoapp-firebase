import * as firebase from 'firebase';
import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/',
    },
    {
      path: '/app',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: () => import('./views/SignUp.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { currentUser } = firebase.auth();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next('/');
  } else if (!requiresAuth && currentUser && from.fullpath !== '/app') {
    next('/app');
  } else {
    next();
  }
});

export default router;
