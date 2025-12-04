import Vue from 'vue'
import App from './App.vue'

if (process.env.NODE_ENV !== 'local') {
  import('./registerServiceWorker')
}

import router from './router'
import store from './store'

import axios from 'axios';
import VueAxios from 'vue-axios';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { EventBus } from './bus/eventBus';
Vue.prototype.$eventBus = EventBus;

library.add(fas);
library.add(fab);
Vue.component('vue-fontawesome', FontAwesomeIcon);

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import '@/assets/styles/global.scss'

import VueScrollTo from 'vue-scrollto'
Vue.use(VueScrollTo, {
  duration: 800,
  easing: 'ease',
  offset: -60
})

Vue.config.productionTip = false

Vue.use(Buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas',
  customIconPacks: {
    'fab': {
      sizes: {
        'default': 'lg',
        'is-small': '1x',
        'is-medium': '2x',
        'is-large': '3x'
      }
    }
  }
  // customIconPacks: {
  //   'fas': {
  //     internalIcons: {
  //       'check': 'check',
  //       'information': 'info-circle',
  //       'alert': 'exclamation-triangle',
  //       'alert-circle': 'exclamation-circle',
  //       'arrow-up': 'arrow-up',
  //       'chevron-right': 'chevron-right',
  //       'chevron-down': 'chevron-down',
  //       'eye': 'eye',
  //       'eye-off': 'eye-slash',
  //       'menu-down': 'chevron-down',
  //       'menu-up': 'chevron-up',
  //       'close-circle': 'times-circle'
  //     }
  //   }
  // }
})

axios.defaults.baseURL = process.env.VUE_APP_HOST_API;
axios.defaults.headers.common['X-API-TOKEN'] = process.env.VUE_APP_API_KEY;
// axios.defaults.baseURL = process.env.VUE_APP_HOST_API || 'http://181.230.38.52:8000/api/';

Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
