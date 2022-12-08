const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();
const cors = require("cors");

app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: true }));
app.use(cors());

const patient_router = require("./routers/patient.router");
const send_email_router = require("./routers/send_email.router");

app.use("/patient", patient_router);
app.use("/email", send_email_router);


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log("start");
  console.log("http://localhost:" + PORT);
});
