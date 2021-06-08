const itemModel = require("../Models/itemModel");
const ItemModel = require("../Models/itemModel");
const orderModel = require("../Models/orderModel");
const UserModel = require("../Models/userModel");

async function addItem(req, res, next) {
  try {
    const {
      _id,
      article,
      category,
      img,
      info,
      name,
      price,
      size,
      sizeImg,
      species,
      styleImg,
      MadeIn,
    } = req.body;

    const item = {
      article,
      category,
      img,
      info,
      name,
      price,
      size,
      sizeImg,
      species,
      styleImg,
      MadeIn,
    };

    if (_id) {
      await ItemModel.findById(_id);
      const updateItem = await ItemModel.findByIdAndUpdate(_id, item, {
        new: true,
      });
      return res
        .status(200)
        .send({ updateItem, message: "Товар відредаговано" });
    }

    const newItem = await ItemModel.create(item);

    return res.status(201).send({ newItem, message: "товар добавлено в базу" });
  } catch (error) {
    console.log("ERROR", error);
    return res
      .status(400)
      .send({ message: "Не заповнені всі поля або не вибрато картинку" });
  }
}

async function deleteItem(req, res) {
  try {
    const id = req.params.id;
    await itemModel.findByIdAndDelete(id);
    res.status(200).send({ message: "Товар видалено з бази" });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Щось пішло не так" });
  }
}

async function allUsersGet(req, res) {
  try {
    const users = await UserModel.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).json({ message: "UPS" });
  }
}

async function allOrdersGet(req, res) {
  try {
    const orders = await orderModel.find();
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).json({ message: "Repit" });
  }
}

module.exports = { addItem, deleteItem, allUsersGet, allOrdersGet };
