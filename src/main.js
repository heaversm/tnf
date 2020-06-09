import DefaultLayout from "~/layouts/Default.vue";
import "~/styles/main.scss";
import OnLoad from 'vue-onload';

export default function(Vue) {
  Vue.component("Layout", DefaultLayout);
  Vue.use(OnLoad);
}
