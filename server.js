const fs = require('fs');
const Koa = require('koa');
const path = require('path');
const koaStatic = require('koa-static');
const Router = require('koa-router');
const koaMount = require('koa-mount')
const send = require('koa-send');

const app = new Koa();
const route = new Router();

const pathResolve = pathName => path.resolve(__dirname, pathName);

const { createBundleRenderer } = require("vue-server-renderer");
const bundle = require("./dist/vue-ssr-server-bundle.json");
const clientManifest = require("./dist/vue-ssr-client-manifest.json");

const template = fs.readFileSync(path.resolve(__dirname, './src/index.template.html'), "utf-8")
// 详细 API 见: https://ssr.vuejs.org/zh/api/
// https://ssr.vuejs.org/zh/guide/bundle-renderer.html#%E4%BD%BF%E7%94%A8%E5%9F%BA%E6%9C%AC-ssr-%E7%9A%84%E9%97%AE%E9%A2%98
// createBundleRenderer 使用 server bundle 和（可选的）选项创建一个 BundleRenderer 实例。
const renderer = createBundleRenderer(bundle, {
    runInNewContext: false, // 推荐
    template, // （可选）页面模板
    clientManifest // （可选）客户端构建 manifest
})

function renderToString(context) {
    return new Promise((resolve, reject) => {
        renderer.renderToString(context, (err, html) => {
           err ? reject(err) : resolve(html)
        })
    })
}

const requestHandler = async (ctx) => {
    const context = {
        title: "ssr test",
        url: ctx.url
    };
    if (ctx.url.includes('.')) {
        return await send(ctx, ctx.url, {root: pathResolve('./dist')})
    }
    const html = await renderToString(context);
    ctx.body = html;
}

// koa-router 匹配任意路由
route.get('/(.*)', requestHandler);

// 加载路由中间件
app.use(route.routes()).use(route.allowedMethods())

// 配置服务器静态资源目录

app.use(koaMount('/dist', koaStatic(pathResolve('./dist'))));

const port = 3001
app.listen(port, () => {
    console.log(`server started at localhost:${port}`);
})