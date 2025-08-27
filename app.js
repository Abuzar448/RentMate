if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const path = require("path");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const user = require("./models/user.js");
const axios = require("axios");

const dbUrl = process.env.ATLAS_DB_URL;

main()
  .then(() => {
    console.log("Connected to DB ✅");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});
store.on("error",()=>{
  console.log("Error in Mongo Session store ",err);
})

const sessionOptions = {
  store,
  resave: false,
  saveUninitialized: true,
  secret: process.env.SECRET,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

app.use(flash());
app.use(expressSession(sessionOptions));



app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const UserRouter = require("./routes/user.js");

app.use(cookieParser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  res.locals.originalUrl = req.originalUrl;
  next();
});

app.use("/listings", listings);
app.use("/listings", reviews);
app.use(UserRouter);

const port = 8080;
app.listen(port, () => {
  console.log(`Server is running to port ${port}`);
});