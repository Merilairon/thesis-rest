const express = require("express");
const router = express.Router();
const {
  postLoginSchema,
  postRegisterSchema,
  getAccountSchema,
  patchAccountSchema,
} = require("../validation");
const { isAuthenticated, isOwnAccountOrAdmin } = require("../permissions");
const controller = require("../controller");

router.post("/register", postRegisterSchema, async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    let account = await controller.register({
      username,
      email,
      password,
    });
    res.json({
      success: true,
      message: "User registered",
      data: account,
    });
  } catch (e) {
    res.status(500);
    res.json({
      success: false,
      message: "An error occured during the" + "insertion procedure for user",
      data: {},
    });
  }
});

router.post("/login", postLoginSchema, async (req, res, next) => {
  try {
    const { username, password } = req.body;
    let token = await controller.login({ username, password });
    res.json({
      success: true,
      message: "User logged in",
      data: token,
    });
  } catch (e) {
    res.status(500);
    res.json({
      success: false,
      message: "An error occured during the authentication procedure for user",
      data: {},
    });
  }
});

router.get("/current", isAuthenticated, async (req, res, next) => {
  try {
    const { sub } = req.user;
    let account = await controller.account({ id: sub });
    res.json({
      success: true,
      message: "User retrieved",
      data: account,
    });
  } catch (e) {
    res.status(500);
    res.json({
      success: false,
      message: `An error occured during the retrieval procedure for user with id ${req.params.id}`,
      data: {},
    });
  }
});

router.get("/:id", getAccountSchema, async (req, res, next) => {
  try {
    const { id } = req.params;
    let account = await controller.account({ id });
    res.json({
      success: true,
      message: "User retrieved",
      data: account,
    });
  } catch (e) {
    res.status(500);
    res.json({
      success: false,
      message: `An error occured during the retrieval procedure for user with id ${req.params.id}`,
      data: {},
    });
  }
});

router.get("/", async (req, res, next) => {
  try {
    let accounts = await controller.accounts();
    res.json({
      success: true,
      message: "Users retrieved",
      data: accounts,
    });
  } catch (e) {
    res.status(500);
    res.json({
      success: false,
      message: `An error occured during the retrieval procedure for users`,
      data: {},
    });
  }
});

router.patch(
  "/",
  isOwnAccountOrAdmin,
  patchAccountSchema,
  async (req, res, next) => {
    try {
      const user = req.user;
      const { username, email, password, roles } = req.body;
      let account = await controller.updateAccount({
        id: user.sub,
        username,
        email,
        password,
        roles,
      });
      res.json({
        success: true,
        message: "User updated",
        data: account,
      });
    } catch (e) {
      res.status(500);
      res.json({
        success: false,
        message: `An error occured during the update procedure for user with id ${req.params.id}`,
        data: {},
      });
    }
  }
);

router.delete("/", isAuthenticated, async (req, res, next) => {
  try {
    const user = req.user;
    let account = await controller.deleteAccount({ user });
    res.json({
      success: true,
      message: "User deleted",
      data: account,
    });
  } catch (e) {
    res.status(500);
    res.json({
      success: false,
      message: `An error occured during the deletion procedure for user with id ${req.params.id}`,
      data: {},
    });
  }
});

module.exports = router;
