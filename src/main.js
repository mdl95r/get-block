import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import components from "./ui/index";
import vClickOutside from "click-outside-vue3";

const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component);
});

app.use(vClickOutside);

app.use(store).mount("#app");
