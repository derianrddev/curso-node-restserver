const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGODB_CNN);
    console.log("Online databases");
  } catch (error) {
    console.log(error);
    throw new Error("Error when starting the database");
  }
};

module.exports = {
  dbConnection,
};
