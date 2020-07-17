import createApp from './main'

const {app, router, store} = createApp();

// 服务端调取异步 API 获取数据后, 客户端 store 在挂载到应用程序之前, 就应该获取到状态, 否则会出现服务端与客户端 store 状态不一致的问题
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}

//该方法把一个回调排队，在路由完成初始导航时调用，这意味着它可以解析所有的异步进入钩子和路由初始化相关联的异步组件。
//这可以有效确保服务端渲染时服务端和客户端输出的一致。
router.onReady(() => {
    // 添加路由钩子函数，用于处理 asyncData.
    // 在初始路由 resolve 后执行，
    // 以便我们不会二次预取(double-fetch)已有的数据。
    // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)
        // 我们只关心非预渲染的组件
        // 所以我们对比它们，找出两个匹配列表的差异组件
        let diffed = false
        const activated = matched.filter((c, i) => {
        return diffed || (diffed = (prevMatched[i] !== c))
        })

        if (!activated.length) {
        return next()
        }

        // 这里如果有加载指示器 (loading indicator)，就触发
        Promise.all(activated.map(c => {
            if (c.asyncData) {
                return c.asyncData({ store, route: to })
            }
            })).then(() => {

            // 停止加载指示器(loading indicator)
            
            next()
        }).catch(next)
    })
    // 这里假定 App.vue 模板中根元素具有 `id="app"`
    app.$mount('#app')
})
