import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from './router.js';
import store from './store/store.js';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

// Component atoms
import ButtonDanger from './components/atoms/buttons/ButtonDanger.vue';
import ButtonPrimary from './components/atoms/buttons/ButtonPrimary.vue';
import BreadCrumb from './components/atoms/breadcrumb/BreadCrumb.vue';
import BaseAlert from './components/atoms/alert/BaseAlert.vue';
import Card from './components/atoms/card/Card.vue';

library.add(faArrowLeft);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.component("button-danger", ButtonDanger);
app.component("button-primary", ButtonPrimary);
app.component("bread-crumb", BreadCrumb);
app.component("base-alert", BaseAlert);
app.component("card", Card);

app.use(store);

app.use(router);


app.mount('#app')
