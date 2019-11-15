const mongoose = require('mongoose')

const dataScheam = new mongoose.Schema({
    name: String,
    url: String,
    type: String,
    size: String,
    key: String,
    ascription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    time: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('StorageData', dataScheam)
