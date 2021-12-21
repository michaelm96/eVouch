require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cron = require("node-cron");
const moment = require("moment");
const port = process.env.PORT || 3000;
const routes = require("./routes/route");
const voucher = require("./model/voucher.model");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// To inactivate a voucher when it meeets expiry date
cron.schedule(
  "0 0 * * *",
  async () => {
    // run every midnite
    try {
      const allVouch = await voucher.getAll();
      for (const ele of allVouch) {
        if (moment(ele.expiry_date).format("LL") === moment().format("LL")) {
          await voucher.changeStatus(ele.id, "Inactive");
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  {
    timezone: "Asia/Jakarta",
  }
);

app.listen(port, () => {
  console.log(moment().format("LL"));
  console.log(`starting server on port ${port}`);
});
module.exports = app;
