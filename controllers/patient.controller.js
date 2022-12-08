const patient_model = require('../models/patient.model');

const get_all_patient = async (req, res) => 
{
    const get_all_patient = await patient_model.get_all_patient();
    res.send(get_all_patient);
};


module.exports = {
    get_all_patient
  }