import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router'

// import "~/styles/element/index.scss";

// import ElementPlus from "element-plus";
// import all element css, uncommented next line
// import "element-plus/dist/index.css";

// or use cdn, uncomment cdn link in `index.html`

import "~/styles/index.scss";
import "uno.css";

// If you want to use ElMessage, import it.
import "element-plus/theme-chalk/src/message.scss";
import './index.css'

const pinia = createPinia();
const app = createApp(App);
// app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(pinia);
app.use(router).mount("#app");
