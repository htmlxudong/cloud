const router = require('koa-router')()
const StorageData = require('../models/storageData')
const deleteFileKeys = []

router.prefix('/data')

router.post('/upload', async ctx => {
    const { body } = ctx.request
    const fileCreate = await StorageData.create(body)
    if(fileCreate) {
        ctx.body = { code: 1, msg: '上传成功' }
    }  else {
        ctx.body = { code: 0, msg: '上传失败' }
    }
})

router.post('/isUpload', async ctx => {
    const { key } = ctx.request.body
    const fileCreate = await StorageData.findOne({ key })
    if(!fileCreate) {
        ctx.body = { code: 1, msg: '可上传' }
    }  else {
        ctx.body = { code: 0, msg: '已存在' }
    }
})

router.get('/list', async ctx => {
    const { changeIndex, type, userId } = ctx.request.query
    let list = []
    let totalLen = 0
    if (type) {
        totalLen = await StorageData.countDocuments ({ type, ascription: userId})
        // 如果
        list = await StorageData.find({
            type,
            ascription: userId
        }).populate('ascription').skip((changeIndex - 1) * 7).limit(changeIndex * 7)
    } else {
        totalLen = await StorageData.countDocuments ({ ascription: userId})
        list = await StorageData.find({ ascription: userId })
                .populate('ascription')
                .skip((changeIndex - 1) * 7)
                .limit(changeIndex * 7)
    }
    ctx.body = { code: 1, msg: '成功', data: list, totalLen}
})

router.post('/delete', async ctx => {
    const { key } = ctx.request.body
    const info = await StorageData.deleteOne({ key })
    if (Object.values(info).every(item => item)) {
        ctx.body = { code: 1, info: '删除成功' }
    } else {
        ctx.body = { code: 0, info: '删除失败' }
    }
})

module.exports = router