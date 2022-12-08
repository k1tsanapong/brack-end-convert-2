require('dotenv').config();

const conn = require("../db");
const nodemailer = require("nodemailer");

const send_email_to_patient = async (data) => {
  let results = [];

  let store_url = [];
  console.log("now model");

  let split_string = data.send_to_patient.split(",");

  console.log(split_string);

  let get_detail = [];

  try {


    let sql =
      'SELECT `hos_num`, `e_mail`, `date_input`, CONCAT_WS(" ", `f_name`, `l_name`) AS `whole_name` FROM `patient` WHERE hos_num IN (?)';
    get_detail = await conn.awaitQuery(sql, [split_string]);
    console.log("get detail");

    results = await get_detail.forEach(function (item, i) {
      console.log("sending...");



      let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: `${process.env.My_Email}`,
          pass: `${process.env.My_Email_Password}`,
        }
    });


    transporter.sendMail({
        from: `${process.env.My_User_name} <${process.env.My_Email}>`,   // ผู้ส่ง
        to: `${item.whole_name} <${item.e_mail}>`,// ผู้รับ
        subject: "สวัสดีจ้า",                      // หัวข้อ
        text: "สวัสดีนะ",                         // ข้อความ
        html: `${JSON.stringify(item)}`,
    }, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info.messageId);
        }
    });

    });

    return JSON.stringify({ status: 200, error: null, response: results });
  } catch (err) {
    console.log("email failed");
    console.log(err);

    return JSON.stringify({ status: 500, error: err, response: results });
  }
};


module.exports = {
  send_email_to_patient,
};
