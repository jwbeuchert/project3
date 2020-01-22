const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const giftSchema = new Schema({
    dateAdded: { type: Date, default: Date.now },
});

const Gift = mongoose.model("Gift", giftSchema);

module.exports = Gift;