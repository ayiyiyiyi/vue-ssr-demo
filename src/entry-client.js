import createApp from './main'

const {app, router} = createApp();

//该方法把一个回调排队，在路由完成初始导航时调用，这意味着它可以解析所有的异步进入钩子和路由初始化相关联的异步组件。
//这可以有效确保服务端渲染时服务端和客户端输出的一致。
router.onReady(() => {
    // 这里假定 App.vue 模板中根元素具有 `id="app"`
    app.$mount('#app')
})
