const express = require("express");
const send_email_controller = require("../controllers/send_email.controller");

const router = express.Router();

router.post("/send-to-patient", send_email_controller.send_email_to_patient);

module.exports = router;
