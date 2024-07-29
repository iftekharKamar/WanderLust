const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));

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

//Index Route

app.get("/listings",async (req,res)=>{
  const allListings = await Listing.find({});
  res.render("listings/index.ejs",{allListings});
})

//New Route
app.get("/listings/new",(req,res)=>{
  res.render("listings/new.ejs");
})

//Create Route

app.post("/listings",async (req,res)=>{
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
})

//Show route

app.get("/listings/:id",async (req,res)=>{
  let {id} = req.params;
  const listing =  await Listing.findById(id);
  res.render("listings/show.ejs",{listing});
})

// app.get("/testingLink", async (req, res) => {
//     try {
//       let sampleListing = new Listing({
//         title: "My Home Town",
//         description: "Near Airport",
//         price: 2500,
//         location: "Uttar Pradesh , Lucknow",
//         country: "India",
//       });
//       await sampleListing.save();
//       console.log("sample was saved");
//       res.send("working");
//     } catch (err) {
//       console.error(err);
//       res.status(500).send("Error saving listing");
//     }
//   });

app.listen(8080,()=>{
    console.log("sever is working");
})