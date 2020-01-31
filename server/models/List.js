const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema({
  name: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now },
  chats: [{ type: Schema.Types.ObjectId, ref: "Chat" }],
  gifts: [{ type: Schema.Types.ObjectId, ref: "Gift" }],
  gifters: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

const List = mongoose.model("List", listSchema);

module.exports = List;
