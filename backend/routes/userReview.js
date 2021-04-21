const db = require("../database");

const router = require("express").Router();

module.exports = router.post("/userReview", (req, res) => {
  const { feedback, userId, serviceId, type } = req.body;
  console.log(feedback);
  db.query(
    "INSERT INTO feedback (feedback,service_type,service_number,user_id) VALUES (?,?,?,?)",
    [feedback, type, serviceId, userId],
    (err, result) => {
      if (err) {
        res.json({ err: err });
      } else {
        res.json({ result: result });
      }
    }
  );
});

module.exports = router.post("/deleteFeedback", (req, res) => {
  const { id } = req.body;
  console.log(id);
  db.query("DELETE FROM feedback WHERE fed_id = ?", id, (err, result) => {
    if (err) {
      res.json({ err: err });
      console.log(err);
    } else {
      res.json({ result: result });
    }
  });
});

module.exports = router.get("/userBookingReview", (req, res) => {
  const type = "booking";

  db.query(
    "SELECT users.fname as client, users.lname as lastname, users.user_id,feedback,service_type,feedback,service_number,fed_id FROM feedback JOIN users ON feedback.user_id = users.user_id WHERE service_type = ?",
    type,
    (err, result) => {
      if (!err) {
        res.json({ result: result });
      } else {
        res.json({ err: err });
      }
    }
  );
});

module.exports = router.get("/userProductReview", (req, res) => {
  const type = "product";

  db.query(
    "SELECT users.fname as client, users.lname as lastname, users.user_id,feedback,service_type,feedback,service_number,fed_id FROM feedback JOIN users ON feedback.user_id = users.user_id WHERE service_type = ?",
    type,
    (err, result) => {
      if (!err) {
        res.json({ result: result });
      } else {
        res.json({ err: err });
      }
    }
  );
});
