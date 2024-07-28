const express = require("express");
const app = express();
const mongoose = require("mongoose");

const Listing = require('./models/listing');

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{

    console.log(err);
})

async function main() {
    try {
      await mongoose.connect(MONGO_URL);
    } catch (err) {
      console.error(err);
    }
  }

app.get("/",(req,res)=>{
    res.send("Hi, I am root");
})

app.get("/testingLink", async (req, res) => {
    try {
      let sampleListing = new Listing({
        title: "My Home Town",
        description: "Near Airport",
        price: 2500,
        location: "Uttar Pradesh , Lucknow",
        country: "India",
      });
      await sampleListing.save();
      console.log("sample was saved");
      res.send("working");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error saving listing");
    }
  });

app.listen(8080,()=>{
    console.log("sever is working");
})