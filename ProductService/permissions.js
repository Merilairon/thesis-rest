module.exports = {
  isAuthenticated: async (req, res, next) => {
    const user = req.user;
    if (user != null) return next();
    else {
      let e = new Error("Forbidden");
      e.status = 403;
      return next(e);
    }
  },
  isAuthorizedAsAdmin: async (req, res, next) => {
    const user = req.user;
    if (user != null && user.roles.includes("admin")) return next();
    else {
      let e = new Error("Unauthorized");
      e.status = 401;
      return next(e);
    }
  },
};
