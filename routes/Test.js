const express = require("express");
let router = express.Router();

router.get("/" ,  (req , res)=>{
    console.log("Test is working");
    res.send("Test is working");
});

module.exports = router;