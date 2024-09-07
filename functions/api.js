const express = require("express");
const serverless = require("serverless-http");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const { isLoggedIn } = require("../middleware/isLogIn");

const app = express();

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(bodyParser.json({ limit: "10000kb" }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

require("../config/passport");

const auth = require("../routs/auth");
const posts = require("../routs/posts");
const user = require("../routs/user");

const router = express.Router();
router.use("/api/auth/", auth);
router.use("/api/user/", isLoggedIn, user);
router.use("/api/posts/", isLoggedIn, posts);

app.use("/.netlify/functions/api/", router);

module.exports.handler = serverless(app);
console.log("maxmum");
