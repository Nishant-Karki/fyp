const db = require("../database");

const router = require("express").Router();
const moment = require("moment");

const checkStaff = "SELECT * FROM staff WHERE user_id=?";

const appointmentQuery =
  "INSERT INTO appointment (user_id,service_id,staff_name,date,time) VALUES (?,?,?,?,?)";

module.exports = router.post("/bookAppointment", (req, res) => {
  const { serviceId, userId, time, date, specialist } = req.body;
  console.log(specialist, time);
  let booked;
  if (specialist.length > 0 && time.length > 0) {
    db.query(checkStaff, userId, (err, result) => {
      if (result.length > 0) {
        res.json({
          message: "Sorry! Staffs are not permitted to book appointment.",
          type: "warning",
        });
      } else {
        db.query(
          "SELECT service_id,staff_name,date,time FROM appointment",
          (err, result) => {
            result.map((item) => {
              if (
                item.staff_name === specialist &&
                moment(item.date).format("YYYY-MM-DD") ===
                  moment(date).format("YYYY-MM-DD") &&
                item.time === time &&
                item.staff_name === specialist
              ) {
                booked = true;
              }
              // } else {

              // }
            });
            if (!booked === true) {
              db.query(
                appointmentQuery,
                [userId, serviceId, specialist, date, time],
                (err, result) => {
                  if (!err) {
                    res.json({
                      message: "Appointment is booked.",
                      type: "success",
                      result: result,
                    });
                  }
                }
              );
            } else {
              res.json({
                message:
                  "Sorry! Appointment is already booked for the selected date",
                type: "error",
              });
            }
          }
        );
      }
    });
  } else {
    res.json({ message: "Please fill all the fields", type: "info" });
  }
});
