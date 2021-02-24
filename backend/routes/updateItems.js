const router = require("express").Router();
const db = require("../database");

const updateServiceQuery =
  "UPDATE service SET name=?,price=?,description=? WHERE service_id =?";

const updateProductQuery =
  "UPDATE product SET name=?,price=?,description=? WHERE product_id =?";

module.exports = router.post("/updateService", (req, res) => {
  // const { service_id } = req.body.service_id;
  // const { name, price, description, image } = req.body.values;
  // console.log(req.body.values);
});

module.exports = router.post("/updateProduct", (req, res) => {
  const { name, price, description } = req.body.values;
  const id = req.body.product_id;

  db.query(
    updateProductQuery,
    [name, price, description, id],
    (err, result) => {
      if (err) {
        res.json({ message: "Error Occurred", type: "error" });
      } else {
        res.json({
          message: "Successfully Updated",
          type: "success",
        });
      }
    }
  );
});

module.exports = router.post("/updateService", (req, res) => {
  // const { service_id } = req.body.service_id;
  // const { name, price, description, image } = req.body.values;
  // console.log(req.body.values);
});

module.exports = router.post("/updateService", (req, res) => {
  const { name, price, description } = req.body.values;
  const id = req.body.product_id;

  db.query(
    updateServiceQuery,
    [name, price, description, id],
    (err, result) => {
      if (err) {
        res.json({ message: "Error Occurred", type: "error" });
      } else {
        res.json({
          message: "Successfully Updated",
          type: "success",
        });
      }
    }
  );
});
