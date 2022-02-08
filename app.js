const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const morgan = require("morgan");
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')
const adminRoutes = require("./routes/adminRoutes");
const courseRoutes = require("./routes/courseRoutes");
const coursePathRoutes = require('./routes/coursePathRoutes');
const authRoutes = require('./routes/authRoutes');
const {requireAuth, checkUser} = require('./middlewares/authMidleware');
const app = express();




const dbURL =
  "mongodb+srv://ezgi:206123Es.@nodeserver.xdrun.mongodb.net/NodeServer?retryWrites=true&w=majority";
mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("connected db"))
  .catch((err) => console.log(err));


  require('dotenv').config();



app.listen(100);
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
app.set('layout', './layouts/main');


app.set("view engine", "ejs");


app.use(morgan("dev"));


app.use(cookieParser())
app.use(flash());
app.use(fileUpload());
app.get('*', checkUser)
app.get("/", (req, res) => {
  res.redirect("/login");
});

app.use('/',authRoutes);
app.use('/admin',requireAuth,adminRoutes);
app.use('/course', courseRoutes);
app.use('/coursePath', coursePathRoutes);


app.get("/about", (req, res) => {
  res.render("about", { title: "About Educo" });
});

app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

app.use((req, res) => {
  res.status(404).render("404", { title: "Page Not Found" });
});

