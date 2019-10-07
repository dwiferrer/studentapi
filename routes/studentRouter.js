const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const Students = require("../models/students")

const studentRouter = express.Router()

studentRouter.use(bodyParser.json())

//STUDENTLIST
studentRouter.route("/studentlist")
.get((req, res, next) => {
    Students.find({})
    .then((student) => {
        res.render("index", {students: student})
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
    }, (err) => next(err))
    .catch((err) => next(err))
})

.delete((req, res, next) => {
    Students.remove({})
    .then((resp)=>{
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.json(resp)
    }, (err => next(err)))
    .catch((err) => next(err))
})

//CREATE
studentRouter.route("/create")
.get((req, res, next) => {
    res.render("new-entry")
})

.post((req, res, next) => {
    Students.create(req.body)
    .then((student) =>{
        console.log("Student created ", student)
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        // res.json(student)
        res.redirect("/studentlist")
    }, (err => next(err)))
    .catch((err) => next(err))
})

//READ
studentRouter.route("/profile/:studentId")
.get((req, res, next) => {
    Students.find({sid: req.params.studentId})
    .then((student)=>{
        res.render("view-entry", {students: student})
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        //res.json(student)
    }, (err) => next(err))
    .catch((err)=> next(err))
})

//UPDATE
studentRouter.route("/edit/:studentId")
.get((req, res, next) => {
    Students.find({sid: req.params.studentId})
    .then((student)=>{
        res.render("edit-entry", {students: student})
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        //res.json(student)
    }, (err) => next(err))
    .catch((err)=> next(err))
})

.post((req, res, next) => {
    Students.findOneAndUpdate({ sid: req.params.studentId}, {
        $set: req.body
    }, {new: true})
    .then((student)=>{
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.redirect("/studentlist")
    }, (err) => next(err))
    .catch((err)=> next(err))
})

//DELETE
studentRouter.route("/delete/:studentId")
.get((req, res, next) => {
    // Students.find({sid: req.params.studentId})
    // .then((student)=>{
    //     res.render("delete-entry", {students: student})
    //     res.statusCode = 200
    //     res.setHeader("Content-Type", "application/json")
    // }, (err) => next(err))
    // .catch((err)=> next(err))
    Students.findOneAndRemove({ sid: req.params.studentId })
    .then((student)=>{
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.redirect("/studentlist")
    }, (err => next(err)))
    .catch((err) => next(err)) 
})

// .delete((req, res, next) => {
//     Students.findOneAndRemove({ sid: req.params.studentId })
//     .then((student)=>{
//         res.statusCode = 200
//         res.setHeader("Content-Type", "application/json")
//         //res.json(student)
//         res.redirect("/studentlist")
//     }, (err => next(err)))
//     .catch((err) => next(err))
// })

module.exports = studentRouter