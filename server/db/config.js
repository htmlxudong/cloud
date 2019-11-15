const mongoose = require('mongoose')

const Mongoose = {
  url: 'mongodb://localhost:27017/Cloud',
  connect() {
    mongoose.connect(this.url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
      if(!err) {
        console.log('mongodb connected')
      }
    })
  }
}

module.exports = { Mongoose}