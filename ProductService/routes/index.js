const express = require("express");
const router = express.Router();
const {
  postProductSchema,
  getProductSchema,
  patchProductSchema,
  deleteProductSchema,
} = require("../validation");
const { isAuthorizedAsAdmin } = require("../permissions");
const controller = require("../controller");

router.get("/", async (req, res, next) => {
  try {
    let products = await controller.products();
    res.json({
      success: true,
      message: "Products retrieved",
      data: products,
    });
  } catch (e) {
    res.status(500);
    res.json({
      success: false,
      message: "An error occured during the retrieval procedure for products",
      data: {},
    });
  }
});

router.get("/:id", getProductSchema, async (req, res, next) => {
  try {
    let product = await controller.product({ id: req.params.id });
    res.json({
      success: true,
      message: "Product retrieved",
      data: product,
    });
  } catch (e) {
    res.status(500);
    res.json({
      success: false,
      message: `An error occured during the retrieval procedure for product with id ${req.params.id}`,
      data: {},
    });
  }
});

router.post(
  "/",
  [isAuthorizedAsAdmin, postProductSchema],
  async (req, res, next) => {
    try {
      const { name, description, pictureUrl, price } = req.body;
      let product = await controller.insertProduct({
        name,
        description,
        pictureUrl,
        price,
      });
      res.json({
        success: true,
        message: "Product inserted",
        data: product,
      });
    } catch (e) {
      res.status(500);
      res.json({
        success: false,
        message: `An error occured during the insertion procedure for product`,
        data: {},
      });
    }
  }
);

router.patch(
  "/:id",
  [isAuthorizedAsAdmin, patchProductSchema],
  async (req, res, next) => {
    try {
      const { name, description, pictureUrl, price } = req.body;
      let product = await controller.updateProduct({
        id: req.params.id,
        name,
        description,
        pictureUrl,
        price,
      });
      res.json({
        success: true,
        message: "Product updated",
        data: product,
      });
    } catch (e) {
      res.status(500);
      res.json({
        success: false,
        message: `An error occured during the update procedure for product with id ${req.params.id}`,
        data: {},
      });
    }
  }
);

router.delete(
  "/:id",
  [isAuthorizedAsAdmin, deleteProductSchema],
  async (req, res, next) => {
    try {
      let product = await controller.deleteProduct({
        id: req.params.id,
      });
      res.json({
        success: true,
        message: "Product deleted",
        data: product,
      });
    } catch (e) {
      res.status(500);
      res.json({
        success: false,
        message: `An error occured during the deletion procedure for product with id ${req.params.id}`,
        data: {},
      });
    }
  }
);

module.exports = router;
