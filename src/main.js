import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import router from "./router.js";
import store from "./store/store.js";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowLeft,
  faPenSquare,
  faTrash,
  faInfoCircle,
  faStar,
  faCheckSquare,
  faWindowClose,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";

// Component atoms
import ButtonDanger from "./components/atoms/buttons/ButtonDanger.vue";
import ButtonPrimary from "./components/atoms/buttons/ButtonPrimary.vue";
import ButtonWarning from "./components/atoms/buttons/ButtonWarning.vue";
import ButtonSuccess from "./components/atoms/buttons/ButtonSuccess.vue";
import MenuTitle from "./components/atoms/menuTitle/MenuTitle.vue";
import BaseAlert from "./components/atoms/alert/BaseAlert.vue";
import Card from "./components/atoms/card/Card.vue";
import CardBody from "./components/atoms/card/CardBody.vue";
import BaseBreadCrumb from "./components/atoms/breadcrumb/BaseBreadCrumb.vue";
import DeleteModal from "./components/atoms/modal/DeleteModal.vue";
import SaveModal from "./components/atoms/modal/SaveModal.vue";
import SideToSideStat from "./components/molecules/chart/SideToSideStat.vue";
import BaseStatCard from "./components/atoms/chart/BaseStatCard.vue";
import BarChart from "./components/atoms/chart/BarChart.vue";
import DataTable from "./components/molecules/datatable/DataTable.vue";

// component forms
import EmailForm from "./components/atoms/forms/EmailForm.vue";
import PasswordForm from "./components/atoms/forms/PasswordForm.vue";
import Checkbox from "./components/atoms/forms/Checkbox.vue";
import Text from "./components/atoms/forms/Text.vue";
import FormInput from "./components/atoms/forms/FormInput.vue";

library.add(faArrowLeft);
library.add(faPenSquare);
library.add(faTrash);
library.add(faInfoCircle);
library.add(faStar);
library.add(faCheckSquare);
library.add(faWindowClose);
library.add(faCaretUp);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.component("button-danger", ButtonDanger);
app.component("button-primary", ButtonPrimary);
app.component("button-warning", ButtonWarning);
app.component("button-success", ButtonSuccess);
app.component("menu-title", MenuTitle);
app.component("base-alert", BaseAlert);
app.component("card", Card);
app.component("card-body", CardBody);
app.component("base-bread-crumb", BaseBreadCrumb);
app.component("delete-modal", DeleteModal);
app.component("save-modal", SaveModal);
app.component("side-to-side-stat", SideToSideStat);
app.component("base-stat-card", BaseStatCard);
app.component("bar-chart", BarChart);
app.component("data-table", DataTable);

// forms
app.component("email-form", EmailForm);
app.component("password-form", PasswordForm);
app.component("checkbox-form", Checkbox);
app.component("text-form", Text);
app.component("form-input", FormInput);

app.use(store);
app.use(router);

app.mount("#app");
