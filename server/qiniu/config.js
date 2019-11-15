const qiniu = require('qiniu')

const accessKey = 'JMpmkSDGIaWrX3podDLBS4fDyIrgJ7HNtY5DPSIj'
const secretKey = 'wnXa3Q3zqwZh670wTUyBnOsQy4j2Y3e2lnElDxHF'
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const bucket = 'zcloudstorage'

const options = {
    scope: bucket,
    expires: Math.round(Date.now() / 1000)  
}

const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)

// 删除空间中文件
const config = new qiniu.conf.Config()
config.zone = qiniu.zone.Zone_z2
const bucketManager = new qiniu.rs.BucketManager(mac, config)

module.exports = {
    uploadToken,
    qiniuDelete(key) {
        return new Promise((resolve, reject) => {
            bucketManager.delete(bucket, key, function(err, respBody, respInfo) {
                if (err) {
                    reject(err)
                } else {
                    const response = {
                        respBody,
                        statusCode: respInfo.statusCode
                    }
                    resolve(response)
                }
            })
        })
    }
}