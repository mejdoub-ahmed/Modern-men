const express = require("express");


const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer  = require('multer');

dotenv.config();

const app = express();

app.use(express.json())
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/categories",categoryRoute)



mongoose.set('strictQuery', false);


mongoose
  .connect("mongodb+srv://houssem:1234@cluster0.jsonddh.mongodb.net/blog?retryWrites=true&w=majority")
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

  const storage = multer.diskStorage({destination:(req,file,cb)=>{
    cb(null,"images")
  } ,filename: (req, file, cb)=>{
cb(null,req.body.name)
  }
});
const upload =multer({storage:storage})

app.post("/api/upload",upload.single("file"),(req,res)=>{
  res.status(201).json("file has been uploaded")
})

   


app.listen("5002",()=>{

    console.log("backend is running ");
});