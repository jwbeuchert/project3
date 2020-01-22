const db = require("../models")

module.exports = {
    findAll: function (req, res) {
        db.Chat.find(req.query).then(dbChats => res.json(dbChats)).catch(err => res.status(422).json(err))
    },
    findById: function (req, res) {
        db.Chat.findById(req.params.id).then(dbChat => res.json(dbChat)).catch(err => res.status(422).json(err))
    },
    create: function (req, res) {
        db.Chat.create(req.body).then(dbChat => res.json(dbChat))
    },
    update: function (req, res) {
        db.Chat.findOneAndUpdate({ _id: req.params.id }, req.body).then(dbChat => res.json(dbChat)).catch(err => res.status(422).json(err))
    },
    remove: function (req, res) {
        db.Chat.findById(req.params.id).then(dbChat => dbChat.remove()).then(dbChat => res.json(dbChat)).catch(err => res.status(422).json(err))
    }
}