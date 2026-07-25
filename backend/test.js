const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/taskmanager")
  .then(() => {
    console.log("✅ Connected Successfully");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Connection Failed");
    console.error(err);
    process.exit(1);
  });