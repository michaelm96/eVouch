const User = require("../../model/user.model");

class UserController {
  static async register(req, res, next) {
    try {
      const { name, email, password, address, phone_number } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: "Email or Password is missing",
        });
      }

      if (!phone_number) {
        return res.status(400).json({
          message: "Phone number is missing",
        });
      }

      const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

      const customer = await stripe.customers.create({
        email: email,
        phone: phone_number,
      });

      const user = new User({
        name,
        email,
        password,
        address,
        phone_number,
        customerId: customer.id
      });

      const result = await User.register(user);

      console.log(result, "20");

      if (result.message === "Error") {
        return res.status(500).json({
          message: result.error,
        });
      }

      

      return res.status(201).json({
        message: "Successfully created user",
      });
    } catch (error) {
      console.log(error, "33");
      return res.status(500).json({
        message: error,
      });
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      console.log(req.body);

      if (!email || !password) {
        return res.status(400).json({
          message: "Email or Password is missing",
        });
      }

      const result = await User.login({ email, password });

      console.log(result, "56");

      if (result.message === "Error") {
        return res.status(500).json({
          message: result.error,
        });
      }

      if (result.message === "Invalid") {
        return res.status(400).json({
          message: "Wrong email or password",
        });
      }

      return res.status(200).json({
        message: "Login Succeed",
        token: result.token,
      });
    } catch (error) {
      console.log(error, "68");
      return res.status(500).json({
        message: error,
      });
    }
  }
}

module.exports = UserController;
