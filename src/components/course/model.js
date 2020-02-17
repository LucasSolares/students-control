const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({

    course_name: String,
    sections: [{
        type: Schema.Types.ObjectId,
        ref: 'section'
    }],

})

module.exports = mongoose.model('course', schema)