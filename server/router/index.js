const Router = require('koa-router')

const router = new Router()

router.get('/', async (ctx, next) => {
  console.log('主页')
})

module.exports = router