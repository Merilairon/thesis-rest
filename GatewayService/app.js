require("dotenv").config();
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const expressJwt = require("express-jwt");

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
    proxyReq.setHeader("user", JSON.stringify(req.user));
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

app.listen(4000);
