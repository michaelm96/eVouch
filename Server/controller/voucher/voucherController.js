const { changeStatus } = require("../../model/voucher.model");
const Voucher = require("../../model/voucher.model");
const User_Vouch = require("../../model/user_vouch.model");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

class VoucherController {
  static async insert(req, res, next) {
    console.log("INSERT");
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
      } = req.body;

      if (
        !title ||
        !desc ||
        !expiry_date ||
        !image ||
        !amount ||
        !payment_method ||
        !discount ||
        !quantity ||
        !buy_type ||
        !limit
      ) {
        return res.status(400).json({
          message: "there are missing fields",
        });
      }

      const voucher = new Voucher({
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
        status: "Active",
      });

      const result = await Voucher.insert(voucher);

      console.log(result, "51");

      if (result.message === "Error") {
        return res.status(500).json({
          message: result.error,
        });
      }

      return res.status(201).json({
        message: "Successfully created voucher",
      });
    } catch (error) {
      console.log(error, "63");
      return res.status(500).json({
        message: error,
      });
    }
  }

  static async getAll(req, res, next) {
    try {
      const result = await Voucher.getAll();

      console.log(result, "74");

      if (result.message === "Error") {
        return res.status(500).json({
          message: result.error,
        });
      }

      return res.status(200).json({
        message: "Successfully retrieved voucher",
        result: result.data,
      });
    } catch (error) {
      console.log(error, "63");
      return res.status(500).json({
        message: error,
      });
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await Voucher.getById(id);

      if (result.message === "Error") {
        return res.status(500).json({
          message: result.error,
        });
      }

      if (result.message === "404") {
        return res.status(404).json({
          message: "data not found",
        });
      }

      return res.status(200).json({
        message: "Successfully retrieved vouch",
        result: result.data,
      });
    } catch (error) {
      console.log(error, "113");
      return res.status(500).json({
        message: error,
      });
    }
  }

  static async verifyByTitle(req, res, next) {
    try {
      const { title } = req.body;
      if (!title) {
        return res.status(400).json({
          message: "Title field is empty",
        });
      }
      const result = await Voucher.verifyByTitle(title);

      if (result.message === "Error") {
        return res.status(500).json({
          message: result.error,
        });
      }

      if (result.message === "404") {
        return res.status(404).json({
          message: "data not found",
        });
      }

      return res.status(201).json({
        message: "Successfully verify voucher",
        result: result.data,
      });
    } catch (error) {
      console.log(error, "113");
      return res.status(500).json({
        message: error,
      });
    }
  }

  static async changeStatus(req, res, next) {
    try {
      const { status } = req.body;
      const { id } = req.params;
      if (!status) {
        return res.status(400).json({
          message: "Status field is empty",
        });
      }
      const result = await Voucher.changeStatus(id, status);

      if (result.message === "Error") {
        return res.status(500).json({
          message: result.error,
        });
      }

      if (result.message === "404") {
        return res.status(404).json({
          message: "voucher not found",
        });
      }

      return res.status(200).json({
        message: "Successfully change status",
      });
    } catch (error) {
      console.log(error, "179");
      return res.status(500).json({
        message: error,
      });
    }
  }

  static async checkout(req, res, next) {
    try {
      let itemsArr = [];
      for (const item of req.body.items) {
        const result = await Voucher.getById(item.id);

        if (result.message === "Error") {
          return res.status(500).json({
            message: result.error,
          });
        }

        if (result.message !== "404") {
          itemsArr.push({
            name: result.data[0].title,
            unit_amount: result.data[0].amount,
            quantity: item.quantity,
          });
        }
      }

      return res.status(200).json({
        message: "Checking out",
        data: itemsArr,
      });
    } catch (error) {
      console.log(error, "179");
      return res.status(500).json({
        message: error,
      });
    }
  }

  static async makePayment(req, res, next) {
    try {
      const { amount, number, exp_month, exp_year, items } = req.body;
      // const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

      console.log(req.body, "rebod");
      const token = await stripe.tokens.create({
        card: {
          number: number.toString(),
          exp_month: exp_month,
          exp_year: exp_year,
        },
      });

      console.log(token, "token");

      const charge = await stripe.charges.create({
        amount: amount,
        currency: "usd",
        source: token.id,
      });

      console.log(charge.status, "charge");
      console.log(items, "items");

      if (charge.status === "succeeded") {
        for (const item of items) {
          const newUserVouch = new User_Vouch({
            userId: req.userData.id,
            voucherId: item.id,
            unused: item.quantity,
          });

          const result = await User_Vouch.insert(newUserVouch);

          if (result.message === "Error") {
            return res.status(500).json({
              message: result.error,
            });
          }
        }

        return res.status(200).json({
          message: "Successfully make a payment",
        });
      }
    } catch (error) {
      console.log(error, "113");
      return res.status(500).json({
        message: error,
      });
    }
  }

  static async useVoucher(req, res, next) {
    try {
      const { voucherId, userId, amount } = req.body;

      const result = await User_Vouch.useVoucher(voucherId, userId, amount);

      if (result.message === "Error") {
        return res.status(500).json({
          message: result.error,
        });
      }

      return res.status(200).json({
        message: `${amount} of voucher(s) used`,
      });
    } catch (error) {
      console.log(error, "298");
      return res.status(500).json({
        message: error,
      });
    }
  }

  static async getUserVoucher(req, res, next) {
    try {
      const { id } = req.params;

      const data = await User_Vouch.getUserVoucher(id);

      if (data.message === "Error") {
        return res.status(500).json({
          message: data.error,
        });
      }

      if (data.message === "Empty") {
        return res.status(404).json({
          message: "No data found",
          result: []
        });
      }

      return res.status(200).json({
        message: `user voucher retrieved`,
        result: data.result,
      });
    } catch (error) {
      console.log(error, "298");
      return res.status(500).json({
        message: error,
      });
    }
  }

  static async paymentMethodList(req, res, next) {
    try {
      const { type } = req.body;

      const paymentMethods = await stripe.customers.listPaymentMethods(
        req.userData.customerId,
        { type: type }
      );

      console.log(paymentMethods);

      return res.status(200).json({
        message: "User's payment list method successfully retrieved",
        result: paymentMethods.data,
      });
    } catch (error) {
      console.log(error, "347");
      return res.status(500).json({
        message: error,
      });
    }
  }

  static async paymentMethodList(req, res, next) {
    try {
      const { type } = req.body;

      const paymentMethods = await stripe.customers.listPaymentMethods(
        req.userData.customerId,
        { type: type }
      );

      console.log(paymentMethods);

      return res.status(201).json({
        message: "User's payment list method successfully retrieved",
        result: paymentMethods.data,
      });
    } catch (error) {
      console.log(error, "347");
      return res.status(500).json({
        message: error,
      });
    }
  }

  static async editVoucher(req, res, next) {
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
      } = req.body;
      const { id } = req.params;

      console.log(req.body, "RB");

      const updatedVoucher = new Voucher({
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
      });

      const data = await Voucher.put(updatedVoucher, id);

      if (data.message === "Error") {
        return res.status(500).send({
          message:
            // result.error ||
            "Some error occurred while creating the api call log.",
        });
      }

      return res.status(200).json({
        message: `Successfully updated voucher with id ${id}`,
      });
    } catch (error) {
      console.log(error, "347");
      return res.status(500).json({
        message: error,
      });
    }
  }
}

module.exports = VoucherController;
