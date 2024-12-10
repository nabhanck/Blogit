const express = require("express");
const PostModel = require("./models/post.model");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
const CommentModel = require("./models/comment.model");
const DpModel = require("./models/dp.model");

const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = "hqweuhqwuehqwu";

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Blogit");

app.listen(5000, () => {
  console.log("Server started");
});

// Registering a new User
app.post("/register", async (req, res) => {
  const {
    username,
    password,
    image,
    location,
    organization,
    contact,
  } = req.body;
  try {
    const userDoc = await UserModel.create({
      username,
      image,
      location,
      organization,
      contact,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

// Logging the user
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await UserModel.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
        // image,
      });
    });
  } else if (!passOk) {
    res.status(400).json("wrong credentials");
  }
});

// Getting user name
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

// Getting profile details
app.get("/profile/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await UserModel.findById(id);
  res.json(postDoc);
});

// // Getting profile details for header
// app.get("/profileheader/:id", async (req, res) => {
//   const { headerId } = req.body;
//   const postDoc = await UserModel.findOne(headerId);
//   res.json(postDoc);
// });

// Updating profile details
app.put("/profile/:id", async (req, res) => {
  const { id } = req.params;
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }
  const exsttDoc = await UserModel.findById(id);
  const { username, location, organization, contact } = req.body;
  const postDoc = await UserModel.findByIdAndUpdate(id, {
    username,
    location,
    organization,
    contact,
    image: newPath ? newPath : exsttDoc.image,
  });
  res.json(postDoc);
});

// Logout
app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

// Creating a new Post
app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await PostModel.create({
      title,
      summary,
      content,
      image: newPath,
      author: info.id,
    });
    res.json({ files: req.file });
  });
});

// Getting all the Blogs
app.get("/post", async (req, res) => {
  const postDoc = await PostModel.find()
    .populate("author", ["username", "image"])
    .sort({ createdAt: -1 });
  res.json(postDoc);
});

// Getting Blogs by id
app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await PostModel.findById(id).populate("author", [
    "username",
    "image",
  ]);
  res.json(postDoc);
});

// Deleting Blogs by id
app.delete("/post-delete/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await PostModel.findByIdAndDelete(id);
  res.json(postDoc);
});

// Updating blogs
app.put("/edit-post", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
    const postDoc = await PostModel.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      res.status(400).json("Unauthorized");
    }
    await postDoc.updateOne({
      title,
      summary,
      content,
      image: newPath ? newPath : postDoc.image,
    });
    res.json(postDoc);
  });
});

// Posting a Comments
app.post("/comment", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { content, postId } = req.body;
    const postDoc = await CommentModel.create({
      content,
      author: info.id,
      postId,
    });
    res.json(postDoc);
  });
});

// Deleting Comments
app.delete("/delete-comment/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await CommentModel.findByIdAndDelete(id);
  res.json(postDoc);
});

// Getting specific comment
app.get("/comment-delete/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await CommentModel.findById(id).populate("author");
  res.json(postDoc);
});

// Getting Comments
app.get("/comment/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await CommentModel.find({
    postId: id,
  }).populate("author");
  res.json(postDoc);
});

// Get all post by id
app.get("/mypost/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await PostModel.find({ author: id });
  res.json(postDoc);
});

// Uploading profile pic
app.put("/dp/:id", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }
  const { id } = req.params;
  const { username, location, organization, contact } = req.body;
  const exsttDoc = await UserModel.findById(id);
  const postDoc = await exsttDoc.updateOne({
    username,
    location,
    organization,
    contact,
    image: newPath ? newPath : exsttDoc.image,
  });
  res.json(postDoc);
});

// Getting the dp
app.get("/dp/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await UserModel.findById(id);
  res.json(postDoc);
});

// Getting authors posts
app.get("/author/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await PostModel.find({ author: id }).populate("author", [
    "username",
    "image",
  ]);
  res.json(postDoc);
});
