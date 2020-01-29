const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.User.find()
      .populate("lists")
      .populate("giftees")
      .populate("gifts")
      .then(dbUsers => res.json(dbUsers))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.User.findById(req.params.id)
      .populate("lists")
      .populate("giftees")
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  findOne: (req, res) => {
    db.User.findOne(req.body)
      .populate("lists")
      .populate("giftees")
      .then(user => {
        res.json(user);
      })
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.User.findOne(req.body)
      .populate("lists")
      .populate("giftees")
      .then(user => {
        if (!user) {
          db.User.create(req.body).then(newUser => {
            db.List.create({"name": "All Gifts"})
              .then(newList => {
                newUser.lists.push(newList._id)
                return newUser.save()
              }).then(res.json(newUser))
          });
        } else {
          res.json(user);
        }
      });
  },
  update: function(req, res) {
    db.User.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.User.findById(req.params.id)
      .then(dbUser => dbUser.remove())
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  addGiftee: function(req, res) {
    db.User.findById(req.params.gifteeid)
      .then(dbGiftee =>
        db.User.findOneAndUpdate(
          { _id: req.params.gifterid },
          { $push: { giftees: dbGiftee._id } },
          { new: true }
        )
      )
      .then(dbGifter => res.json(dbGifter))
      .catch(err => res.status(422).json(err));
  }
};
