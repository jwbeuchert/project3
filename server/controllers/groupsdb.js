const db = require("../model")

module.exports = {
    findAll: function (req, res) {
        db.Group.find(req.query).then(dbGroups => res.json(dbGroups)).catch(err => res.status(422).json(err))
    },
    findById: function (req, res) {
        db.Group.findById(req.params.id).then(dbGroup => res.json(dbGroup)).catch(err => res.status(422).json(err))
    },
    create: function (req, res) {
        db.Group.create(req.body).then(dbGroup => res.json(dbGroup))
    },
    update: function (req, res) {
        db.Group.findOneAndUpdate({ _id: req.params.id }, req.body).then(dbGroup => res.json(dbGroup)).catch(err => res.status(422).json(err))
    },
    remove: function (req, res) {
        db.Group.findById(req.params.id).then(dbGroup => dbGroup.remove()).then(dbGroup => res.json(dbGroup)).catch(err => res.status(422).json(err))
    }
}