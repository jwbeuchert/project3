const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    text: { type: String, required: true },
    dateAdded: { type: Date, default: Date.now },
    owner: [{ type: Schema.Types.ObjectId, ref: 'User' }]

});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;