import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./firebase";
import { firestorePlugin } from "vuefire";

Vue.config.productionTip = false;
Vue.use(firestorePlugin);

Vue.component("todo", require("./components/Todo").default);

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");