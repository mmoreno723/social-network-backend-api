const { connect, connection } = require("mongoose");

const connectionStr =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/studentsDB";

connect(connectionStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
