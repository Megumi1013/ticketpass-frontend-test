import { createApp } from "vue"
import App from "./App.vue"
import "./assets/css/index.css"
import router from "@/router"
import { createPinia } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import Notifications from "@kyvg/vue3-notification"

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app
  .use(router)
  .use(pinia)
  .use(Notifications)
  .mount("#app")