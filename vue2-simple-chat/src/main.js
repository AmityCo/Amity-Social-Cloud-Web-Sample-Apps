/* eslint-disable import/first */

import Vue from "vue";
import App from "./App.vue";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
Vue.component("vue-fontawesome", FontAwesomeIcon);

import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faEye,
  faPaperPlane,
  faEllipsisV,
  faFlag,
  faPaperclip,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faEye,
  faPaperPlane,
  faEllipsisV,
  faFlag,
  faPaperclip,
  faTimesCircle
);

import "./style.scss";
import Buefy from "buefy";

Vue.use(Buefy, {
  defaultIconComponent: "vue-fontawesome",
  defaultIconPack: "fas",
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
