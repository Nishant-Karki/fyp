const router = require("express").Router();
const db = require("../database");
const fs = require("fs");

const deleteServiceQuery = "DELETE FROM service WHERE service_id = ?";
const deleteProductQuery = "DELETE FROM product WHERE product_id = ?";

module.exports = router.post("/deleteService", (req, res) => {
  const { service_id, name, image } = req.body.items;

  db.query(deleteServiceQuery, service_id, (err, result) => {
    err && res.json({ message: `Failed to delete ${name} data` });
    if (!err) {
      result &&
        fs.unlink(`../frontend/src/images/services/${image}`, (err) =>
          console.log(err)
        );
      res.json({
        message: `${name} is successfully removed from the database.`,
      });
    }
  });
});

module.exports = router.post("/deleteProduct", (req, res) => {
  const { product_id, name, image } = req.body.items;
  console.log(product_id);
  db.query(deleteProductQuery, product_id, (err, result) => {
    err && res.json({ message: `Failed to delete ${name} data` });
    if (!err) {
      result &&
        fs.unlink(`../frontend/src/images/products/${image}`, (err) =>
          console.log(err)
        );
      res.json({
        message: `${name} is successfully removed from the database.`,
      });
    }
  });
});
