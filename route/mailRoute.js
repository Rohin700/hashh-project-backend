var objMailController = require("../controller/mailController");
var express = require("express");
var router = express.Router();

router.post("/domailing" ,objMailController.doMail);

module.exports = router;