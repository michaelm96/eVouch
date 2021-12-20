const sql = require("../config/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// constructor
const User = function (user) {
  this.email = user.email;
  this.password = user.password;
  this.address = user.address;
  this.phone_number = user.phone_number;
  this.limit = user.limit;
  this.customerId = user.customerId
};

User.register = async (userData) => {
  try {
    const hash = bcrypt.hashSync(userData.password, 9);
    let res = await sql.query(`INSERT INTO user SET ?`, {
      name: !userData.name ? "" : userData.name,
      email: userData.email,
      password: hash,
      address: !userData.address ? "" : userData.address,
      phone_number: userData.phone_number,
      customerId: userData.customerId,
      limit: 50,
    });
    // await sql.end();
    return { message: "Successfully created user" };
  } catch (error) {
    console.log("error: ", error);
    return { message: "Error", error: error };
  }
};

User.login = async (userData) => {
  try {
    let res = await sql.query(
      `SELECT * FROM user WHERE email = "${userData.email}"`
    );
    if (!res[0].length) {
      return { message: "Invalid" };
    }
    const valid = bcrypt.compareSync(userData.password, res[0][0].password);
    // await sql.end();
    if (!valid) {
      return { message: "Invalid" };
    }
    let payload = { id: res[0][0].id, email: res[0][0].email, phone_number: res[0][0].phone_number, customerId: res[0][0].customerId }
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });

    return { message: "Success", token: token };
  } catch (error) {
    console.log("error: ", error);
    return { message: "Error", error: error };
  }
};

module.exports = User;
