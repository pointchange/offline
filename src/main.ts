import './assets/module/layout.css'
import './assets/module/nav.css'
import './assets/module/a.css'
import './assets/module/form.css'
import './assets/main.css'
import './assets/module/list.css'
import './assets/module/init.css'
import './assets/module/other.css'
import pinia from './stores'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
