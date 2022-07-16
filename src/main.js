import { createApp } from 'vue'
import App from './App.vue'
import './assets/scss/main.scss'
import routers from "@/routers";
import stores from "@/assets/store/stores";
import PaginateV from "vuejs-paginate-next";
const app = createApp(App);
app.component("PaginateV",PaginateV)
app.use(routers);
app.use(stores);
app.mount('#app')
