const { transporter } = require("../helper/nodemailer");
const OrderModel = require("../Models/orderModel");

const emailOrder = require("../emails/order");
const telegram = require("../telegram");
const userModel = require("../Models/userModel");

async function addOrder(req, res) {
  try {
    const {
      name,
      email,
      phone,
      adress,
      count,
      sum,
      goods,
      owner,
      date,
    } = req.body;
    const order = {
      owner,
      name,
      email,
      phone,
      adress,
      count,
      sum,
      goods,
      date,
    };
    const newOrder = await OrderModel.create(order);
    await userModel.findByIdAndUpdate(
      owner,
      {
        $push: { orders: newOrder._id },
      },
      { new: true }
    );
    res.status(201).send(newOrder);
    await transporter.sendMail(emailOrder(email, newOrder));
    telegram();
  } catch (error) {
    console.log(error);
  }
}

async function userOrders(req, res, next) {
  try {
    const { id } = req.params;
    const orders = await OrderModel.find({ owner: id }).exec();
    res.status(200).send(orders);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: `"ERROR", ${error}` });
  }
}
module.exports = { addOrder, userOrders };
