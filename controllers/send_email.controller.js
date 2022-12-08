const send_email_model = require("../models/send_email.model");

const send_email_to_patient = async (req, res) => {
  console.log("now controller");
  const send_email_to_patient = await send_email_model.send_email_to_patient(
    req.body
  );
  
  // res.redirect('/success')
  res.send(send_email_to_patient);
};

module.exports = {
  send_email_to_patient,
};
