const db = require("../models")

module.exports = {
    findAll: function (req, res) {
        db.List.find(req.query).then(dbLists => res.json(dbLists)).catch(err => res.status(422).json(err))
    },
    findById: function (req, res) {
        db.List.findById(req.params.id).then(dbList => res.json(dbList)).catch(err => res.status(422).json(err))
    },
    create: function (req, res) {
        db.List.create(req.body).then(dbList => res.json(dbList))
    },
    update: function (req, res) {
        db.List.findOneAndUpdate({ _id: req.params.id }, req.body).then(dbList => res.json(dbList)).catch(err => res.status(422).json(err))
    },
    remove: function (req, res) {
        db.List.findById(req.params.id).then(dbList => dbList.remove()).then(dbList => res.json(dbList)).catch(err => res.status(422).json(err))
    }
}