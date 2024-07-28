
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema =new Schema({
    title:{
       type: String,
       required:true,
    },
    description:String,
    image:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2016/11/02/05/32/error-1790610_640.png",
        set:(v)=>v===""?"https://cdn.pixabay.com/photo/2016/11/02/05/32/error-1790610_640.png":v,
    },
    price:Number,
    location:String,
    country:String,
});

const Listing =mongoose.model("Listing",listingSchema);

module.exports =Listing;