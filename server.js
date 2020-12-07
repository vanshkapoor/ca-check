var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const routes = require("./routes.js");
const passport = require("passport");
const { validate, ValidationError, Joi } = require("express-validation");

require("dotenv").config();
const Port = process.env.PORT || 5000;

var app = express();

// MIDDLEWARES
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cors());
app.use(passport.initialize());
//passport
require("./config/passport-config")(passport);

// DB CONNECTION
mongoose.connect(
  // process.env.MongoURI
  "mongodb://vansh:a1a2a3a4@ds211613.mlab.com:11613/espace",
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log("err");
    } else {
      console.log("connected to DB");
    }
  }
);
mongoose.set("useCreateIndex", true);
mongoose.set("debug", true);

// ROUTE
app.get("/", function (req, res) {
  res.send("/ check");
});
app.use("/api", routes);

app.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.json(err);
  }

  return res.status(500).json(err);
});

// CONNECTION
app.listen(Port, "0.0.0.0");
console.log("server running on port: http://localhost:" + Port);
