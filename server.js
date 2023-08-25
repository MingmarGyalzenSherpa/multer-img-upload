const express = require("express");
const app = express();
const appConfig = require("./config/appConfig");
const path = require("path");

//mongoose
const mongoose = require("mongoose");
const Image = require("./model/Image");

const ejs = require("ejs");
const multer = require("multer");
const { connect } = require("http2");
const { connectToDB } = require("./config/connect");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: async (req, file, cb) => {
    console.log(file);
    const imageName = file.originalname;
    const fileName = Date.now() + path.extname(file.originalname);
    console.log(fileName);
    const pathName = "http://localhost:8000/static/images/" + fileName;
    await Image.create({ imageName: imageName, path: pathName });
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

app.use("/static", express.static(__dirname + "/public"));

app.set("view_engine", "ejs");

app.get("/", async (req, res) => {
  //   res.sendFile(path.join(__dirname, "index.html"));
  const images = await Image.find();

  res.render("./index.ejs", { images: images });
});

app.post("/post-file", upload.single("myFile"), (req, res) => {
  console.log("Uploaded file name is : ", req.body);
  res.redirect("/");
});

app.get("/img", (req, res) => {
  res.sendFile(path.join(__dirname, "/files/26b01a2605c22b9cdfe5b9f31e14519d"));
});

connectToDB().then(() => {
  console.log("connected to DB");
  app.listen(appConfig.PORT, () => {
    console.log("Server started");
  });
});
