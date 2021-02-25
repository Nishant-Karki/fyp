const db = require("../database");

const dbQueryPOST =
  "INSERT INTO service (name,price,description,image) VALUES (?,?,?,?)";

const dbQueryGET = "SELECT * FROM service";

module.exports = addServicePOST = (req, res) => {
  const { filename } = req.file;
  const { name, description, price } = req.body;

  // to pass the path to the database
  const image_path = `${filename}`;

  try {
    if (!req.file) {
      console.log("No file received");
      message = "Error while image upload";
      res.send({ message: message, status: "danger" });
    } else {
      db.query(
        dbQueryPOST,
        [name, price, description, image_path],
        (err, result) => {
          err && console.log(err);
          result && res.send({ image: image_path, result: result });
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = addServiceGET = (req, res) => {
  db.query(dbQueryGET, (err, result) => {
    err && console.log(err);
    result && res.json({ result });
  });
};
