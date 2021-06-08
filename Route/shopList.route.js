const exspress = require("express");

const {
  getItem,
  getItemId,
  getItemFilter,
} = require("../Controllers/ItemControler");
const { addOrder, userOrders } = require("../Controllers/OrderControler");
const { addItem, deleteItem } = require("../Controllers/adminPanelControler");

// const { uploadImgToStorage, upload } = require("../middleware/file");

const router = exspress.Router();

router.get("/get", getItem);
router.post("/add", addItem); //admin
router.delete("/delete/:id", deleteItem);
// router.post("/", addItem);
router.get("/goods/:id", getItemId);

router.post("/post/order", addOrder);
router.get("/shop/:name", getItemFilter);
router.get("/user/:id", userOrders);

// router.post("/post/order", addOrder);

module.exports = router;
