const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.User.find().populate("lists").populate("giftees")
        .then(dbUsers => res.json(dbUsers))
        .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.User.findById(req.params.id)
      .populate("lists").populate("giftees")
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log(req.body)
    db.User.findOne(req.body).then((user, err) => {
      console.log("inside find one")
      console.log(`this is the err: ${err}`)
      console.log(`this is the user: ${user}`)
      if (!user) {
        db.User.create(req.body).then(dbUser => res.json(dbUser));
      } else {
        res.json(user);
      }
    })
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
    .then(dbGiftee => db.User.findOneAndUpdate(
      { _id: req.params.gifterid},
      {$push: { giftees: dbGiftee._id } },
      {new: true}
      )
    ).then(dbGifter => res.json(dbGifter))
    .catch(err => res.status(422).json(err));
  }
};
