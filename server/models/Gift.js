const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const giftSchema = new Schema({
    name: { type: String, required: true },
    link: { type: String, required: true },
    description: { type: String },
    cost: { type: Number },
    isGifted: { type: Boolean },
    dateAdded: { type: Date, default: Date.now },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    lists: [{ type: Schema.Types.ObjectId, ref: 'List' }],
});

const Gift = mongoose.model("Gift", giftSchema);

module.exports = Gift;