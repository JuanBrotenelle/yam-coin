import { createRouter, createWebHistory } from 'vue-router'

const isMobileDevice = () => {
  const userAgent = navigator.userAgent || navigator.platform;

  // Проверяем на Android устройства
  //if (/android/i.test(userAgent)) {
  //  return true;
  //}
//
  //// Проверяем на iOS устройства
  //if (/iPad|iPhone|iPod/.test(userAgent)) {
  //  return true;
  //}

  return true;
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Main.vue'),
      beforeEnter: (to, from, next) => {
        if (!isMobileDevice()) {
          // Если не мобильное устройство, перенаправляем на страницу с запретом
          next({ name: 'not-allowed' });
        } else {
          next(); // Продолжаем, если мобильное устройство
        }
      }
    },
    {
      path: '/upgrades',
      name: 'upgrades',
      component: () => import('../views/Upgrades.vue'),
      beforeEnter: (to, from, next) => {
        if (!isMobileDevice()) {
          // Если не мобильное устройство, перенаправляем на страницу с запретом
          next({ name: 'not-allowed' });
        } else {
          next(); // Продолжаем, если мобильное устройство
        }
      }
    },
    {
      path: '/friends',
      name: 'friends',
      component: () => import('../views/Friends.vue'),
      beforeEnter: (to, from, next) => {
        if (!isMobileDevice()) {
          // Если не мобильное устройство, перенаправляем на страницу с запретом
          next({ name: 'not-allowed' });
        } else {
          next(); // Продолжаем, если мобильное устройство
        }
      }
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: () => import('../views/Wallet.vue'),
      beforeEnter: (to, from, next) => {
        if (!isMobileDevice()) {
          // Если не мобильное устройство, перенаправляем на страницу с запретом
          next({ name: 'not-allowed' });
        } else {
          next(); // Продолжаем, если мобильное устройство
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
