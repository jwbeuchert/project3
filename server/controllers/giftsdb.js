const db = require("../model")

module.exports = {
    findAll: function (req, res) {
        db.Gift.find(req.query).then(dbGifts => res.json(dbGifts)).catch(err => res.status(422).json(err))
    },
    findById: function (req, res) {
        db.Gift.findById(req.params.id).then(dbGift => res.json(dbGift)).catch(err => res.status(422).json(err))
    },
    create: function (req, res) {
        db.Gift.create(req.body).then(dbGift => res.json(dbGift))
    },
    update: function (req, res) {
        db.Gift.findOneAndUpdate({ _id: req.params.id }, req.body).then(dbGift => res.json(dbGift)).catch(err => res.status(422).json(err))
    },
    remove: function (req, res) {
        db.Gift.findById(req.params.id).then(dbGift => dbGift.remove()).then(dbGift => res.json(dbGift)).catch(err => res.status(422).json(err))
    }
}