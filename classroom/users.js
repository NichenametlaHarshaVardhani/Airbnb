const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("hi to users");
});
router.get("/:id",(req,res)=>{
    res.send("hi to id users");
});
router.post("/",(req,res)=>{
    res.send("hi to  post users");
});
router.delete("/:id",(req,res)=>{
    res.send("hi to delete  users");
});

module.exports= router;