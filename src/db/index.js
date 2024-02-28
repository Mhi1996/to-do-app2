const mongoose = require("mongoose");

const connectDB = async function () {
  try {
    const res = mongoose.connect("mongodb://localhost:27017/to_do_app", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (res) {console.log('to do app  DB  connected successfully')}
    
    return "DB not connected";
  } catch (error) {
    console.log(error);
  }
};

module.exports=connectDB;