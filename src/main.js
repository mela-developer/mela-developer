import { createApp } from "vue";
import App from "./App.vue";
import "vuetify/styles";
import vuetify from "./plugins/vuetify.js";
import VueExcelEditor from "vue3-excel-editor";

const app = createApp(App);
app.use(vuetify);
app.use(VueExcelEditor);
app.mount("#app");
