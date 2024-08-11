import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "vuetify/styles";
import vuetify from "./plugins/vuetify.js";

const app = createApp(App);
app.use(vuetify);
app.mount("#app");
