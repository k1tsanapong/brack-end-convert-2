const conn = require("../db");
const get_all_patient = async () => {
  let results = [];

  try {
    let sql =
      'SELECT *, CONCAT_WS(" ", `f_name`, `l_name`) AS `whole_name` FROM `patient`';
    let results = await conn.awaitQuery(sql);

    // console.log(results);

    return JSON.stringify({ status: 200, error: null, response: results });
  } catch (err) {
    return JSON.stringify({ status: 500, error: err, response: results });
  }
};

module.exports = {
  get_all_patient,
};
