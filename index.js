const express = require("express")
const http = require("http")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const path = require("path")

const studentRouter = require("./routes/studentRouter")

const mongoose = require("mongoose")
const Students = require("./models/students")
const url = "mongodb://localhost:27017/conFusion"
const connect = mongoose.connect(url)

connect.then((db) =>{
    console.log("Connected to the server")
}, (err) => {console.log(err)})


const hostname = "localhost"
const port = 3000

const app = express()

app.set("views", path.resolve(__dirname, "views"))
app.set("view engine", "ejs")

app.use(morgan("dev"))

//app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: false}))

app.use("", studentRouter)

app.use(express.static(__dirname + "/public"))

app.use((req, res, next) =>{
    res.statusCode = 200
    res.setHeader("Content-Type", "text/html")
    res.end("<html><body><h1>This is an express server</h1></body></head>")

})

const server = http.createServer(app)
 
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})


