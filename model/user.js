const mongoose = require('mongoose')

const CourseSchema =  new mongoose.Schema({
    name:String,
    description:String,
    price : Number
})

const CourseModel = mongoose.model("course",CourseSchema)

module.exports = CourseModel

