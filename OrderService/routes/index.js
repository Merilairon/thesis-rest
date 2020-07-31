const express = require("express");
const router = express.Router();
const expressJoi = require("express-joi-validator");
const {
  getOrderSchema,
  deleteOrderSchema,
  patchOrderSchema,
  postOrderSchema,
} = require("../validation");
const {} = require("../permissions");
const controller = require("../controller");

//TODO: only allow admin accounts
router.get("/", async (req, res, next) => {
  try {
    let order = await controller.orders();
    res.json({
      success: true,
      message: "Orders retrieved",
      data: order,
    });
  } catch (e) {
    res.json({
      success: false,
      message: `An error occured during the retrieval procedure for orders`,
      data: {},
    });
  }
});

//TODO: only allow your accounts orders
router.get("/:id", expressJoi(getOrderSchema), async (req, res, next) => {
  try {
    let order = await controller.order({ id: req.params.id });
    res.json({
      success: true,
      message: "Order retrieved",
      data: order,
    });
  } catch (e) {
    res.json({
      success: false,
      message: `An error occured during the retrieval procedure for order with id ${req.params.id}`,
      data: {},
    });
  }
});

router.post("/", expressJoi(postOrderSchema), async (req, res, next) => {
  try {
    const { products } = req.body;
    const { sub } = req.user;
    let order = await controller.insertOrder({
      account: sub,
      products,
      status: false,
    });
    res.json({
      success: true,
      message: "Order inserted",
      data: order,
    });
  } catch (e) {
    res.json({
      success: false,
      message: `An error occured during the insertion procedure for order`,
      data: {},
    });
  }
});

//TODO: only allow yourself or admin to edit
router.patch("/:id", expressJoi(patchOrderSchema), async (req, res, next) => {
  try {
    const { sub } = req.user;
    const { account, products, status } = req.body;
    let order = await controller.updateOrder({
      id: req.params.id,
      account,
      products,
      status,
    });
    res.json({
      success: true,
      message: "Order updated",
      data: order,
    });
  } catch (e) {
    res.json({
      success: false,
      message: `An error occured during the update procedure for order with id ${req.params.id}`,
      data: {},
    });
  }
});

//TODO: only allow yourself or admin to remove
router.delete("/:id", expressJoi(deleteOrderSchema), async (req, res, next) => {
  try {
    let order = await controller.deleteOrder({
      id: req.params.id,
      user: req.user,
    });
    res.json({
      success: true,
      message: "Order deleted",
      data: order,
    });
  } catch (e) {
    res.json({
      success: false,
      message: `An error occured during the deletion procedure for order with id ${req.params.id}`,
      data: {},
    });
  }
});

module.exports = router;
