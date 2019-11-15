const mongoose = require('mongoose')
// 视图数据
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
const userSchema = mongoose.Schema({
    username: { type: String , required: true, index: { unique: true}},
    password: { type: String , required: true },
    admin: {type: String , default: false }
})

const UserModel = mongoose.model('user', userSchema)
UserModel.createIndexes() // 让唯一值 index字段生效

let saveUser = async (data) => {
    let user = new UserModel(data)
    return user.save()
            .then(() => {
                return true
            })
            .catch((e) => {
                console.log(e)
                return false
            })
}
let findLogin = async (username, password) => {
    if (password) {
        return UserModel.findOne({ username, password})
    } else {
        return UserModel.findOne({ username })
    }

}
let findUserById = async ({_id}) => {
    return UserModel.findOne({_id})
}
module.exports = {
    saveUser,
    findUserById,
    findLogin
}