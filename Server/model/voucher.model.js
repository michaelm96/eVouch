const sql = require("../config/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// constructor
const Voucher = function (voucher) {
  this.title = voucher.title;
  this.desc = voucher.desc;
  this.expiry_date = voucher.expiry_date;
  this.image = voucher.image;
  this.amount = voucher.amount;
  this.payment_method = voucher.payment_method;
  this.discount = voucher.discount;
  this.quantity = voucher.quantity;
  this.buy_type = voucher.buy_type;
  this.limit = voucher.limit;
  this.status = voucher.status;
};

Voucher.insert = async (vouchData) => {
  try {
    let res = await sql.query(`INSERT INTO vouch SET ?`, vouchData);
    // await sql.end();
    return { message: "Successfully created voucher" };
  } catch (error) {
    console.log("error: ", error);
    return { message: "Error", error: error };
  }
};

Voucher.getAll = async () => {
  try {
    let res = await sql.query(`SELECT * FROM vouch`);
    // await sql.end();
    return { message: "Success", data: res[0] };
  } catch (error) {
    console.log("error: ", error);
    return { message: "Error", error: error };
  }
};

Voucher.getById = async (id) => {
  try {
    let res = await sql.query(`SELECT * FROM vouch WHERE id = ${id}`);
    // await sql.end();
    if (res[0].length) {
      return { message: "Success", data: res[0] };
    }
    return { message: "404" };
  } catch (error) {
    console.log("error: ", error);
    return { message: "Error", error: error };
  }
};

Voucher.verifyByTitle = async (title) => {
  try {
    let res = await sql.query(`SELECT * FROM vouch WHERE title = "${title}"`);
    // await sql.end();
    if (res[0].length) {
      return { message: "Success", data: res[0][0].status };
    }
    return { message: "404" };
  } catch (error) {
    console.log("error: ", error);
    return { message: "Error", error: error };
  }
};

Voucher.changeStatus = async (id, status) => {
  try {
    let res = await sql.query(
      `UPDATE vouch SET status = "${status}" WHERE id = ${id}`
    );
    // await sql.end();
    console.log(res[0], "res");
    if (!res[0].affectedRows) {
      return { message: "404" };
    }
    return { message: "Success" };
  } catch (error) {
    console.log("error: ", error);
    return { message: "Error", error: error };
  }
};

Voucher.put = async (vouchData, id) => {
  try {
    const {
      title,
      desc,
      expiry_date,
      image,
      amount,
      payment_method,
      discount,
      quantity,
      buy_type,
      limit,
      status,
    } = vouchData;
    let query = "";
    let queArr = [];
    if (title) {
      queArr.push("title = " + `'${title}'`);
    }
    if (desc) {
      queArr.push("vouch.desc = " + `'${desc}'`);
    }
    if (expiry_date) {
      queArr.push("expiry_date = " + `'${expiry_date}'`);
    }
    if (image) {
      queArr.push("image = " + `'${image}'`);
    }
    if (amount) {
      queArr.push("amount = " + amount);
    }
    if (payment_method) {
      queArr.push("payment_method = " + `'${payment_method}'`);
    }
    if (discount) {
      queArr.push("discount = " + discount);
    }
    if (quantity) {
      queArr.push("quantity = " + quantity);
    }
    if (buy_type) {
      queArr.push("buy_type = " + `'${buy_type}'`);
    }
    if (limit) {
      queArr.push("vouch.limit = " + limit);
    }
    if (status) {
      queArr.push("status = " + `'${status}'`);
    }

    query = queArr.join();
    console.log(query, "query");
    let res = await sql.query(`UPDATE vouch SET ${query} WHERE id = ${id}`);
    console.log(res, "RES");
    return { message: "Success" };
  } catch (error) {
    console.log("error: ", error);
    return { message: "Error", error: error };
  }
};

module.exports = Voucher;
