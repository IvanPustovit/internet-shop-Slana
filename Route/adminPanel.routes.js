const { Router } = require("express");
const {
  allUsersGet,
  allOrdersGet,
} = require("../Controllers/adminPanelControler");
const router = Router();

router.get("/users", allUsersGet);
router.get("/orders", allOrdersGet);

module.exports = router;
