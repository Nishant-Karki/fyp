const router = require("express").Router();
const db = require("../database");

const updateQuery =
  "UPDATE service SET name=?,price=?,description=?,image=? WHERE service_id =?";

router.route("/updateService", (req, res) => {
  const { service_id } = req.body.service_id;
  const { name, price, description, image } = req.body.values;
  console.log(req.body.values);
});

module.exports = router;
