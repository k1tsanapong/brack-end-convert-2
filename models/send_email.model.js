const conn = require("../db");
const nodemailer = require("nodemailer");

const send_email_to_patient = async (data) => {
  let results = [];

  let store_url = [];
  console.log("now model");

  let split_string = data.send_to_patient.split(",");

  let get_detail = [];

  try {
    let sql =
      'SELECT `hos_num`, `e_mail`, `date_input`, CONCAT_WS(" ", `f_name`, `l_name`) AS `whole_name` FROM `patient` WHERE hos_num IN (?)';
    get_detail = await conn.awaitQuery(sql, [split_string]);
    console.log("get detail");

    results = await get_detail.forEach(function (item, i) {
      console.log("sending...");
      store_url.push(test_email(get_detail[i]));
    });

    return JSON.stringify({ status: 200, error: null, response: results });
  } catch (err) {
    console.log("email failed");
    console.log(err);

    return JSON.stringify({ status: 500, error: err, response: results });
  }
};

const test_email = async (to_who) => {
  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: account.user, // generated ethereal user
        pass: account.pass, // generated ethereal password
      },
    });

    // let option = {
    //     from: 'smtp.ethereal.email',
    //     to: `${to_who.e_mail}`,

    //     subject: 'test123',
    //     html: `<p>${JSON.stringify(to_who)}</p>`
    // }

    transporter.sendMail(test_email_option(to_who)).then((info) => {
      console.log("Suss");
      console.log("Preview URL: " + nodemailer.getTestMessageUrl(info));

      return nodemailer.getTestMessageUrl(info);
    });
  });
};

const test_email_option = (to_who) => {
  let option = {
    from: "smtp.ethereal.email",
    to: `${to_who.e_mail}`,

    subject: "test123",
    html: `${html_rendering(to_who)}`,
  };

  return option;
};

function html_rendering(detail) {
  let html = `
  <div> <h1>hos_num : </h1> <p>${JSON.stringify(detail)}</p> </div>
    
    `;

  return html;
}

module.exports = {
  send_email_to_patient,
};
