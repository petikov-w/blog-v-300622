import { createApp } from 'vue'
import App from './App.vue'
import './assets/scss/main.scss'
import routers from "@/routers";
import stores from "@/assets/store/stores";
const app = createApp(App);
app.use(routers);
app.use(stores);
app.mount('#app')
