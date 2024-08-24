const mongoose= require("mongoose");
const Listing = require("../models/listing.js");
const initData=require("./data.js");



const mongourl="mongodb://127.0.0.1:27017/wanderlust";
main().then(()=> console.log("connected to db"))
.catch((err)=> console.log(err));

async function main(){
    await mongoose.connect(mongourl);
}

const initDb= async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"6682a302aa8bdfad85fc1f6d"}));
    await Listing.insertMany(initData.data);
    console.log("data was intialized");
}

initDb();