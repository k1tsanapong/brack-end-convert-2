const mysql = require(`mysql-await`);

const conn = mysql.createConnection({
    host: "mysql-mdexpress.alwaysdata.net",
    user: "mdexpress",
    password: "081245kittinarin",
    database: "mdexpress_db",
    // port:3306
  });


conn.connect((err) => {

    if (err) throw err;
      console.log(err);
      
    console.log("Mysql Connected...");
  });

  module.exports = conn;
