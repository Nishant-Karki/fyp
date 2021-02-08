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

app.get("/", (req, res) => {
  res.json({ result: "Working fine" });
});

app.get("/test", (req, res) => {
  res.json({ result: "Working fine" });
});

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("Yo, we need a token.");
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
app.get("/isUserAuth", verifyJWT, (res, req) => {
  res.send("You are authenticated");
});

// const multer = require("multer");
// const addServiceAPI = require("./services/addServiceAPI");

// const DIR = "./uploads/";
// const path = require("path");
// const db = require("./database");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, DIR);
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// const upload = multer({ storage: storage }).single("image");

// app.post("/addServices", upload, (req, res) => {
//   const { destination, filename } = req.file;
//   const { name, description, price } = req.body;

//   console.log(name);
//   //to pass the path to the database
//   const image_path = `${destination}${filename}`;

//   try {
//     if (!req.file) {
//       console.log("No file received");
//       message = "Error while image upload";
//       res.send({ message: message, status: "danger" });
//     } else {
//       console.log("file received");
//       db.query(
//         "INSERT INTO service (name,price,description,image) VALUES (?,?,?,?)",
//         [name, price, description, image_path],
//         (err, result) => {
//           err && console.log(err);
//           result && res.send({ message: "successfully added to database" });
//         }
//       );
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

app.listen(3001, () => {
  console.log("Server is running");
});
