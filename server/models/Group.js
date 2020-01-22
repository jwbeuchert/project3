const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: { type: String, required: true },
    dateAdded: { type: Date, default: Date.now },
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;