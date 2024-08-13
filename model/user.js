const mongoose = require('mongoose')

const CourseSchema =  new mongoose.Schema({
    name:String,
    description:String,
    price : Number,
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    ageGroup :Number

})

const CourseModel = mongoose.model("course",CourseSchema)

module.exports = CourseModel

