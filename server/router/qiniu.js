const router = require('koa-router')()
const { uploadToken, qiniuDelete } = require('../qiniu/config')

router.prefix('/qiniu')

router.get('/token', (ctx) => {
    ctx.body = { code: 1, token: uploadToken }
})

router.post('/delete', async ctx => {
    const { key } = ctx.request.body
    const data = await qiniuDelete(key)
    ctx.body = { code:1, info: data }
})

module.exports = router
