const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: Array },
    firstName: { type: String },
    lastName: { type: String },
    dateAdded: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;