let express = require("express");
let app = express();
let User = require("./models/user");
let userRoute = require("./routes/user");
let movieRoute = require("./routes/movie");
let showRoute = require("./routes/show");
let ticketRoute = require("./routes/ticket");
let mongoose = require("mongoose");
let ejsMate = require("ejs-mate");
let session = require("express-session");
let passport = require("passport");
let passportLocal = require("passport-local");
let passportLocalMongoose = require("passport-local-mongoose");
let flash = require("connect-flash");
let Movie = require("./models/movie");
let Show = require("./models/shows");

const dburl = "mongodb://localhost:27017/movieSite";

mongoose.connect(dburl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("we're connected!yeahhhhh");
});

app.use(express.static("public"));
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

let sessionConfig = {
  secret: "Jagdambe",
  saveUninitialized: true,
  resave: false,
};
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(flash());
app.use((req, res, next) => {
  // console.log(req.session)
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});
// app.use(bodyParser.urlencoded())

app.get("/", async (req, res) => {
  let movies = await Movie.find();
  let shows = await Show.find();
  res.render("home.ejs", { movies, shows });
});

app.use("/", userRoute);
app.use("/", movieRoute);
app.use("/", showRoute);
app.use("/", ticketRoute);
app.listen(3000, () => {
  console.log("Started");
});
