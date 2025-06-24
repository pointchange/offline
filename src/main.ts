import './assets/init.css'
import './assets/main.css'
import pinia from './stores'
import { createApp } from 'vue'
import { vActive } from './directives/lrcActive'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.directive('active', vActive)
app.use(pinia)
app.use(router)
app.mount('#app')
