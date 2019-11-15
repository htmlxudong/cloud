const Router = require('koa-router')

const router = new Router()

const UserModel = require('../models/users')

router.prefix('/user')

router.post('/login', async (ctx, next) => {
    let { username, password } = ctx.request.body
    let result = await UserModel.findLogin(username)
    if (result){
        let bool = await UserModel.findLogin(username, password)
        if (bool) {
            ctx.cookies.set('userid', result._id, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: false
            })
            ctx.body = {
                code: 0
            }
        } else {
            ctx.body = {
                code: -1,
                msg: '密码错误'
            }
        }
    } else {
        let res = await UserModel.saveUser({ username, password })
        if (res){
            let user = await UserModel.findLogin(username, password)
            ctx.cookies.set('userid', user._id, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: false
            })
            ctx.body = {
                code: 0
            }
        }
    }
})

router.get('/getUserInfo', async (ctx, next) => {
    let id = ctx.cookies.get('userid')
    if (id){
        let data = await UserModel.findUserById({_id: id})
        if (data) {
            ctx.body = {
                code: 0,
                username: data.username
            }
        }
    } else {
        ctx.body = {
            code: -1
        }
    }
})

module.exports = router