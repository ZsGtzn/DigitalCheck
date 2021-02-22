import Vue from 'vue';

/**
 * 创建挂载body上的组件实例
 * @param Component 需要挂载的组件
 * @param attribute 所传的参数
 */
function create(Component, attribute = {}) {

    let refName = `body_component_${Date.now()}`;

    //
    if (!attribute.ref || attribute.ref.length == 0) {
        attribute.ref = refName;
    }
    else {
        refName = attribute.ref;
    }

    // 创建组件实例
    const vm = new Vue({
        // h 是creatElement方法的别名，作用是返回vNode虚拟dom
        render: h => h(Component, attribute)
        // 不能直接写$mount('body')
        // vue 规定不能直接挂在到body html的跟节点上去
    }).$mount();

    // vm.$el 可以获取虚拟dom实例化的真实dom节点
    document.body.appendChild(vm.$el);

    // 创建回收方法 
    // 1. 获取组件实例
    // 2. 将组件从body上移除 使用removeChild方法
    const vDom = vm.$children[0];
    vDom.remove = () => {
        //
        document.body.removeChild(vm.$el);

        // 销毁实例
        vDom.$destroy();

        //
        vm.$destroy();
    }

    //
    return vm.$refs[refName];
}

export default create