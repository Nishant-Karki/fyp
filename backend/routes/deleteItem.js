const router = require("express").Router();
const db = require("../database");
const fs = require("fs");

const deleteServiceQuery = "DELETE FROM service WHERE service_id = ?";
const deleteProductQuery = "DELETE FROM product WHERE service_id = ?";

module.exports = router.post("/deleteService", (req, res) => {
  const { service_id, name, image } = req.body.items;
  db.query(deleteQuery, service_id, (err, result) => {
    err && res.json({ message: `Failed to delete ${name} data` });
    result && fs.unlink(`./uploads/${image}`, (err) => console.log(err));
    res.json({
      message: `${name} is successfully removed from the database.`,
    });
  });
});

module.exports = router.post("/deleteProduct", (req, res) => {
  const { product_id, name, image } = req.body.items;
  db.query(deleteQuery, product_id, (err, result) => {
    err && res.json({ message: `Failed to delete ${name} data` });
    result && fs.unlink(`./uploads/${image}`, (err) => console.log(err));
    res.json({
      message: `${name} is successfully removed from the database.`,
    });
  });
});
