import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' // Импорт плагина
import { VueTelegramPlugin } from 'vue-tg'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// Создание экземпляра Pinia
const pinia = createPinia()

// Подключение плагина к Pinia
pinia.use(piniaPluginPersistedstate)

app.use(VueTelegramPlugin)
app.use(pinia) // Использование экземпляра Pinia с плагином
app.use(router)

app.mount('#app')
