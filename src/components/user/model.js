const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    name: String,
    lastName: String,
})

module.exports = mongoose.model('user', schema)

