const mongoose = require("mongoose");

module.exports = {
  connectDatabase: async () => {
    try {
      await mongoose.connect(
        process.env.DB_URI || "mongodb://localhost/rest-accounts",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );
      console.log("Database connected");
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  },
};
