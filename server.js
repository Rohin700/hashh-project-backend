var express = require("express");
var app = express();

const cors = require("cors");
var dotenv = require("dotenv");
var env = dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

var mailRoute = require("./route/mailRoute");

app.listen(2004,()=>{
    console.log("Server Started at port : 2004");
})

app.use("/mailsend", mailRoute);

app.use("/",(req,resp)=>{
    resp.send("Welcome");
    console.log("Welcome back Sir")
})