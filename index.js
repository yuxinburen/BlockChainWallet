const Koa = require("koa");
const app = new Koa();

const router = require("./router/router");

const staticResource = require("koa-static");//配置加载静态资源static
const path = require("path");//配置views模版
const viewsModel = require("koa-views");
const koaBody = require("koa-body");//配置post请求的解析

////////////////开始编写具体的业务逻辑中间件//////////////////
app.use(async (ctx, next) => {
    console.log(`${ctx.method} ${ctx.url}`);
    await next()
});

app.use(koaBody({multipart: true}));//可以解析多个字段
app.use(staticResource(path.join(__dirname, "static")));//注册静态文件
app.use(viewsModel(path.join(__dirname, "views"), {extension: "ejs", map: {html: "ejs"}}));//注册模版引擎到中间件
app.use(router.routes());//注册路由

app.listen(3000);