const express = require("express");
const router = express.Router();
const Users = require("../data/models/user");
//const passport = require("passport");
const controller = require("../controller");

// TODO: validate
router.post("/register", async (req, res, next) => {
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
});

// TODO: validate
router.post("/login", async (req, res, next) => {
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

// TODO: authenticate + change :id to use user object instead
router.get("/:id", async (req, res, next) => {
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

// TODO: validate + authenticate
router.patch("/", async (req, res, next) => {
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

// TODO: validate + authenticate
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
