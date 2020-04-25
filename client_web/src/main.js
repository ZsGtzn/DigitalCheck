import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './net/axios'

// 引入全部组件
import Mint from 'mint-ui';
Vue.use(Mint);

//
Vue.mixin({
  data() {
    return {
      
    }
  }
});
Vue.config.productionTip = false
new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
