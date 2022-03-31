import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from './router.js';
import store from './store/store.js';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft, faPenSquare, faTrash, faInfoCircle, faStar, faCheckSquare, faWindowClose } from "@fortawesome/free-solid-svg-icons";

// Component atoms
import ButtonDanger from './components/atoms/buttons/ButtonDanger.vue';
import ButtonPrimary from './components/atoms/buttons/ButtonPrimary.vue';
import ButtonWarning from './components/atoms/buttons/ButtonWarning.vue';
import ButtonSuccess from './components/atoms/buttons/ButtonSuccess.vue';
import MenuTitle from './components/atoms/menuTitle/MenuTitle.vue';
import BaseAlert from './components/atoms/alert/BaseAlert.vue';
import Card from './components/atoms/card/Card.vue';
import BaseBreadCrumb from './components/atoms/breadcrumb/BaseBreadCrumb.vue';
import DeleteModal from './components/atoms/modal/DeleteModal.vue';
import SaveModal from './components/atoms/modal/SaveModal.vue';

library.add(faArrowLeft);
library.add(faPenSquare);
library.add(faTrash);
library.add(faInfoCircle);
library.add(faStar);
library.add(faCheckSquare);
library.add(faWindowClose);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.component("button-danger", ButtonDanger);
app.component("button-primary", ButtonPrimary);
app.component("button-warning", ButtonWarning);
app.component("button-success", ButtonSuccess);
app.component("menu-title", MenuTitle);
app.component("base-alert", BaseAlert);
app.component("card", Card);
app.component("base-bread-crumb", BaseBreadCrumb);
app.component('delete-modal', DeleteModal);
app.component('save-modal', SaveModal);

app.use(store);
app.use(router);

app.mount('#app')
