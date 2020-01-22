const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    dateAdded: { type: Date, default: Date.now },
    chats: [{ type: Schema.Types.ObjectId, ref: 'Chat'}],
    lists: [{ type: Schema.Types.ObjectId, ref: 'List'}],
    gifts: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    gifters: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;