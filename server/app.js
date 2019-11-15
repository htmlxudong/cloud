const Koa = require('koa')
const bodyparser = require('koa-bodyparser')

const { Mongoose } = require('./db/config.js')
const indexRouter = require('./router/index.js')
const qiniuRouter = require('./router/qiniu')
const userRouter = require('./router/user')
const storageDataRouter = require('./router/storageData')

const app = new Koa()

//连接数据库
Mongoose.connect()

app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))


// 配置路由
app.use(indexRouter.routes(), indexRouter.allowedMethods)
app.use(qiniuRouter.routes(), qiniuRouter.allowedMethods)
app.use(storageDataRouter.routes(), storageDataRouter.allowedMethods)
app.use(userRouter.routes(), userRouter.allowedMethods)

app.listen(3000)