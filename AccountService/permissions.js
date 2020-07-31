module.exports = {
  isAuthenticated: async (req, res, next) => {
    const user = req.user;
    if (user !== null) return next();
    else throw new Error("Unauthenticated");
  },
};
