const sql = require("../config/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// constructor
const User_Vouch = function (userVouch) {
  this.userId = userVouch.userId;
  this.voucherId = userVouch.voucherId;
  this.used = userVouch.used;
  this.unused = userVouch.unused;
};

User_Vouch.insert = async (userVouchData) => {
  try {
    let res = await sql.query(`INSERT INTO user_vouch SET ?`, {
      userId: userVouchData.userId,
      voucherId: userVouchData.voucherId,
      unused: userVouchData.unused,
      used: 0,
    });
    // await sql.end();
    return { message: "Success" };
  } catch (error) {
    console.log("error: ", error);
    return { message: "Error", error: error };
  }
};

User_Vouch.useVoucher = async (voucherId, userId, amount) => {
  try {
    let res = await sql.query(
      `UPDATE user_vouch SET unused = unused - ${amount}, used = used + ${amount} WHERE voucherId = "${voucherId}" AND userId = "${userId}",`
    );

    return { message: "Success", result: res };
  } catch (error) {
    console.log("error: ", error);
    return { message: "Error", error: error };
  }
};

User_Vouch.getUserVoucher = async (userId) => {
  try {
    let res = await sql.query(
      `SELECT * FROM user_vouch WHERE userId = "${userId}"`
    );

    if(!res[0].length){
      return { message: "Empty", result: [] };
    }
    return { message: "Success", result: res[0] };
  } catch (error) {
    console.log("error: ", error);
    return { message: "Error", error: error };
  }
};

module.exports = User_Vouch;
