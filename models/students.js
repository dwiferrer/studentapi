const mongoose = require("mongoose")
const Schema = mongoose.Schema

const studentSchema = new Schema({
    sid: {
        type: String,
        required: true,
        unique: true,
        match: [/\d{4}-[A-Za-z]{5}/]
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    level: {
        type: String, 
        enum: ["Freshman", "Sophomore", "Junior", "Senior"],
        required: true
    },
    status: {
        type: String,
        enum: ["Regular", "Irregular"]
    }
})

var Students = mongoose.model("Students", studentSchema)
module.exports = Students