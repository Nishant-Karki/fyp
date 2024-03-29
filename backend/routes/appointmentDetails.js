const router = require("express").Router();
const db = require("../database");

module.exports = router.get("/getAppointment", (req, res) => {
  db.query(
    "SELECT appointment.staff_name as staff_name,appointment.appointment_id as appointment_id, users.user_id as user_id, users.fname as client,service.service_id, service.name as serviceName,service.price as servicePrice, date, time,payment FROM appointment JOIN service ON appointment.service_id = service.service_id JOIN users ON appointment.user_id = users.user_id ",
    (err, result) => {
      if (!err) {
        res.json({ result: result });
      } else {
        res.json({ err: err });
      }
    }
  );
});

module.exports = router.post("/getAppointment", (req, res) => {
  const id = req.body.id;

  db.query("SELECT * FROM appointment WHERE user_id=? ", id, (err, result) => {
    if (err) {
      res.json({ err: err });
    } else {
      res.json({ result: result });
    }
  });
});
