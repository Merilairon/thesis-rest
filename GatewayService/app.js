require("dotenv").config();
const express = require("express");
const expressJwt = require("express-jwt");
const { createProxyMiddleware } = require("http-proxy-middleware");

const port = process.env.PORT || 4000;
const app = express();

app.use(
  expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    credentialsRequired: false,
  })
);

const options = {
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    if (req.user) proxyReq.setHeader("user", JSON.stringify(req.user));
  },
};

const accountsProxy = createProxyMiddleware({
  target: "http://127.0.0.1:4001",
  pathRewrite: { "^/accounts": "" },
  ...options,
});

const productsProxy = createProxyMiddleware({
  target: "http://127.0.0.1:4002",
  pathRewrite: { "^/products": "" },
  ...options,
});

const ordersProxy = createProxyMiddleware({
  target: "http://127.0.0.1:4003",
  pathRewrite: { "^/orders": "" },
  ...options,
});

app.use("/accounts", accountsProxy);
app.use("/products", productsProxy);
app.use("/orders", ordersProxy);

app.get("/v", async (req, res, next) => {
  res.json({ version: "1.0.0" });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    success: false,
    message: err.message,
    data: {},
  });
});

app.listen(port, () => {
  console.log(`Gateway is running on port ${port}.`);
});
