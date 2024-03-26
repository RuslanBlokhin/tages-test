import { createApp } from 'vue';
import './assets/global.css';
import './assets/variables.css';
import App from './App.vue';
import store from './store/index';

createApp(App).use(store).mount('#app');
