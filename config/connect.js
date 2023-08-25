const { default: mongoose } = require("mongoose");
const appConfig = require("./appConfig");

exports.connectToDB = async () => {
  try {
    await mongoose.connect(appConfig.DB_URI);
  } catch (error) {
    console.log(error);
  }
};
