const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    key: "user_id",
    secret: "login",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expire: 60 * 60 * 24,
    },
  })
);

const loginRouter = require("./routes/login");
app.use(loginRouter);

const registerRouter = require("./routes/register");
app.use(registerRouter);

const socialLogRouter = require("./routes/socialLogin");
app.use(socialLogRouter);

const addServicesRouter = require("./routes/addServices");
app.use(addServicesRouter);

const addProductsRouter = require("./routes/addProducts");
app.use(addProductsRouter);

const deleteServiceRouter = require("./routes/deleteItem");
app.use(deleteServiceRouter);

const updateServiceRouter = require("./routes/updateService");
app.use(updateServiceRouter);

const userRoleRouter = require("./routes/userRole");
app.use(userRoleRouter);

const updateRoleRouter = require("./routes/updateRole");
app.use(updateRoleRouter);

const updateUserRouter = require("./routes/updateUser");
app.use(updateUserRouter);

app.get("/", (req, res) => {
  res.json({ result: "Working fine" });
});

const verifyJWT = (req, res, next) => {
  const token = req.headers["authorization"];
  // const token = req.body.token;
  // console.log(req.body.token);
  if (!token) {
    res.json({ auth: false, message: "Please provide a token." });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({
          auth: false,
          message: "You failed to authenticate",
        });
      } else {
        req.user_id = decoded.id;
        next();
      }
    });
  }
};
app.post("/isUserAuth", verifyJWT, (req, res) => {
  res.json({ auth: true, message: "You are authenticated" });
});

app.listen(3001, () => {
  console.log("Server is running");
});
