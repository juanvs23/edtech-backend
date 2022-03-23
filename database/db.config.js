const mongoose = require("mongoose");

const connectionDB = async () => {
  try {
    const connected = await mongoose.connect(process.env.MONGODB);
    console.log("Database connected");
  } catch (error) {
    throw new Error("Falla al tratar de conectar la base de datos");
  }
};

module.exports = {
  connectionDB,
};
