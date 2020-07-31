import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './net/axios'

// 引入全部组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

// 加载全局组件
const requireComponent = require.context(
  // 其组件目录的相对路径
  './base_components',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})

// 混入
Vue.mixin({
  data() {
    return {
      axios,
    }
  }
});

//
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
