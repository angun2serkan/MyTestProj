const monogoose = require("mongoose");

const userSchema = new mongooseSchema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
