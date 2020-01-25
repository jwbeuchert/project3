const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.List.find(req.query)
      .then(dbLists => {
        res.json(dbLists);
      })
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.List.findById(req.params.id)
      .then(dbList => res.json(dbList))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log(`${JSON.stringify(req.body)} and ${req.params.userid}`);
    db.List.create(req.body)
      .then(dblist => {
        console.log("list created");
        return db.User.findOneAndUpdate(
          { _id: req.params.userid },
          { $push: { lists: dblist._id } },
          { new: true }
        );
      }).then(dbuser => res.json(dbuser))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.List.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbList => res.json(dbList))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.List.findById(req.params.id)
      .then(dbList => dbList.remove())
      .then(dbList => res.json(dbList))
      .catch(err => res.status(422).json(err));
  }
};
