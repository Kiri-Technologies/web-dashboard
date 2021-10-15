import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from './router.js';
import store from './store/store.js';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

library.add(faArrowLeft);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(store);

app.use(router);


app.mount('#app')
