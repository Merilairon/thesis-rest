const express = require("express");
const router = express.Router();
const {
  getOrderSchema,
  deleteOrderSchema,
  patchOrderSchema,
  postOrderSchema,
} = require("../validation");
const {
  isAuthorizedAsAdmin,
  isOwnAccount,
  isOwnAccountOrAdmin,
} = require("../permissions");
const controller = require("../controller");

router.get("/", isAuthorizedAsAdmin, async (req, res, next) => {
  try {
    let order = await controller.orders();
    res.json({
      success: true,
      message: "Orders retrieved",
      data: order,
    });
  } catch (e) {
    res.status(500);
    res.json({
      success: false,
      message: `An error occured during the retrieval procedure for orders`,
      data: {},
    });
  }
});

router.get("/:id", [isOwnAccount, getOrderSchema], async (req, res, next) => {
  try {
    let order = await controller.order({ id: req.params.id });
    res.json({
      success: true,
      message: "Order retrieved",
      data: order,
    });
  } catch (e) {
    res.status(500);
    res.json({
      success: false,
      message: `An error occured during the retrieval procedure for order with id ${req.params.id}`,
      data: {},
    });
  }
});

router.post("/", postOrderSchema, async (req, res, next) => {
  try {
    const { products } = req.body;
    const { sub } = req.user;
    let order = await controller.insertOrder({
      account: sub,
      products,
    });
    res.json({
      success: true,
      message: "Order inserted",
      data: order,
    });
  } catch (e) {
    res.status(500);
    res.json({
      success: false,
      message: `An error occured during the insertion procedure for order`,
      data: {},
    });
  }
});

router.patch(
  "/:id",
  [isOwnAccountOrAdmin, patchOrderSchema],
  async (req, res, next) => {
    try {
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
      res.status(500);
      res.json({
        success: false,
        message: `An error occured during the update procedure for order with id ${req.params.id}`,
        data: {},
      });
    }
  }
);

router.delete(
  "/:id",
  [isOwnAccountOrAdmin, deleteOrderSchema],
  async (req, res, next) => {
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
      res.status(500);
      res.json({
        success: false,
        message: `An error occured during the deletion procedure for order with id ${req.params.id}`,
        data: {},
      });
    }
  }
);

module.exports = router;
