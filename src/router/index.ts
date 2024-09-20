import { createRouter, createWebHistory } from 'vue-router'

const isMobileDevice = () => {
  const userAgent = navigator.userAgent || navigator.platform;
 if (/android/i.test(userAgent)) {
   return true;
 }
 if (/iPad|iPhone|iPod/.test(userAgent)) {
   return true;
 }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'loading',
      component: () => import('../views/Loading.vue'),
      beforeEnter: (to, from, next) => {
        if (!isMobileDevice()) {
          next({ name: 'not-allowed' });
        } else {
          next();
        }
      }
    },
    {
      path: '/main',
      name: 'home',
      component: () => import('../views/Main.vue'),
      beforeEnter: (to, from, next) => {
        if (!isMobileDevice()) {
          next({ name: 'not-allowed' });
        } else {
          next();
        }
      }
    },
    {
      path: '/upgrades',
      name: 'upgrades',
      component: () => import('../views/Upgrades.vue'),
      beforeEnter: (to, from, next) => {
        if (!isMobileDevice()) {
          next({ name: 'not-allowed' });
        } else {
          next();
        }
      }
    },
    {
      path: '/friends',
      name: 'friends',
      component: () => import('../views/Friends.vue'),
      beforeEnter: (to, from, next) => {
        if (!isMobileDevice()) {
          
          next({ name: 'not-allowed' });
        } else {
          next();
        }
      }
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: () => import('../views/Wallet.vue'),
      beforeEnter: (to, from, next) => {
        if (!isMobileDevice()) {
          next({ name: 'not-allowed' });
        } else {
          next();
        }
      }
    },
    {
      path: '/notallowed',
      name: 'not-allowed',
      component: () => import('../views/NotAllow.vue'),
    }
  ]
})

export default router
