import createApp from './main'

export default context => {
     // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
    // 以便服务器能够等待所有的内容在渲染前，
    // 就已经准备就绪。
    return new Promise((resolve, reject) => {
        const { app, router } = createApp()

        // 设置服务端路由端位置
        router.push(context.url)
        // 等到 router 将可能的异步组件和钩子函数解析完
        router.onReady(() => {
            // 返回目标位置或是当前路由匹配的组件数组 (是数组的定义/构造类，不是实例)。通常在服务端渲染的数据预加载时使用。
            const matchedComponents = router.getMatchedComponents()
            console.log('matchedComponents', matchedComponents)
            // 匹配不到的路由，执行 reject 函数，并返回 404
            if (!matchedComponents.length) {
                return reject(new Error('no components matched'))
            }
            resolve(app)
        }, reject)
    })
}