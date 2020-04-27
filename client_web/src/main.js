import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './net/axios'

// 引入全部组件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI);

// 引入全部组件
import { Table, TableColumn } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Table);
Vue.use(TableColumn);

//
Vue.mixin({
  data() {
    return {
      axios
    }
  }
});
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
