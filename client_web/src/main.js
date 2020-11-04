import "../globals";

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './net/axios'
import touch from './directives/touch';
import _ from 'lodash';

// 引入全部组件
import MINT, { Toast, MessageBox } from 'mint-ui'

// this style is used for putuobus invoice
if (process.env.ziubao_invoice_platform == "zlkc")
{
    import('./style/putuobus/blue.scss');
}


Vue.use(MINT);

// 引入全部组件
Vue.use(touch);

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
    const componentName = _.upperFirst(
        _.camelCase(
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
            Toast,
            MessageBox,
        }
    }
});

//
Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
