const express = require("express");
const router = express.Router();
const expressJoi = require("express-joi-validator");
const {
  postLoginSchema,
  postRegisterSchema,
  getAccountSchema,
  patchAccountSchema,
} = require("../validation");
const controller = require("../controller");

router.post(
  "/register",
  expressJoi(postRegisterSchema),
  async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      let account = await controller.register({ username, email, password });
      res.json({
        success: true,
        message: "User registered",
        data: account,
      });
    } catch (e) {
      res.json({
        success: false,
        message: "An error occured during the insertion procedure for user",
        data: {},
      });
    }
  }
);

router.post("/login", expressJoi(postLoginSchema), async (req, res, next) => {
  try {
    const { username, password } = req.body;
    let account = await controller.login({ username, password });
    res.json({
      success: true,
      message: "User logged in",
      data: account,
    });
  } catch (e) {
    res.json({
      success: false,
      message: "An error occured during the insertion procedure for user",
      data: {},
    });
  }
});

// TODO: authenticate
router.get("/current", async (req, res, next) => {
  try {
    const { sub } = req.user;
    let account = await controller.account({ id: sub });
    res.json({
      success: true,
      message: "User retrieved",
      data: account,
    });
  } catch (e) {
    res.json({
      success: false,
      message: `An error occured during the retrieval procedure for user with id ${req.params.id}`,
      data: {},
    });
  }
});

router.get("/:id", expressJoi(getAccountSchema), async (req, res, next) => {
  try {
    const { id } = req.params;
    let account = await controller.account({ id });
    res.json({
      success: true,
      message: "User retrieved",
      data: account,
    });
  } catch (e) {
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
    res.json({
      success: false,
      message: `An error occured during the retrieval procedure for users`,
      data: {},
    });
  }
});

router.patch("/", expressJoi(patchAccountSchema), async (req, res, next) => {
  try {
    const user = req.user;
    const { username, email, password } = req.body;
    let account = await controller.updateAccount({
      username,
      email,
      password,
      user,
    });
    res.json({
      success: true,
      message: "User updated",
      data: account,
    });
  } catch (e) {
    res.json({
      success: false,
      message: `An error occured during the update procedure for user with id ${req.params.id}`,
      data: {},
    });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const user = req.user;
    let account = await controller.deleteAccount({ user });
    res.json({
      success: true,
      message: "User deleted",
      data: account,
    });
  } catch (e) {
    res.json({
      success: false,
      message: `An error occured during the deletion procedure for user with id ${req.params.id}`,
      data: {},
    });
  }
});

module.exports = router;
