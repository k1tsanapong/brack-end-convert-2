const express = require("express");
const patient_controller = require('../controllers/patient.controller');

const router = express.Router();

router.get("/", patient_controller.get_all_patient);

// router.get('/:id', patient_controller.get_one_patient);
// router.post("/new", patient_controller.create_one_patient);
// router.put("/edit/:id", patient_controller.update_one_patient);
// router.delete("/delete/:id", patient_controller.delete_one_patient);

module.exports = router;