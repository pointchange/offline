import './assets/main.css'
import pinia from './stores'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
