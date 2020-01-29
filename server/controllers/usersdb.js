const db = require("../models");

module.exports = {
  // GET url example /api/user
  findAll: function(req, res) {
    db.User.find()
      .populate("lists")
      .populate("friends")
      .then(dbUsers => res.json(dbUsers))
      .catch(err => res.status(422).json(err));
  },
  // GET url example /api/user/:userId
  findById: function(req, res) {
    db.User.findById(req.params.id)
      .populate("lists")
      .populate("friends")
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  // POST url example /api/user
  createOrFindOne: function(req, res) {
    db.User.findOne(req.body)
      .populate("lists")
      .populate("friends")
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
  // PUT url example /api/user/:currentUserId/:friendId
  addFriend: function(req, res) {
    db.User.findById(req.params.friendId)
      .then(dbFriend =>
        db.User.findOneAndUpdate(
          { _id: req.params.currentUserId },
          { $push: { friends: dbFriend._id } },
          { new: true }
        )
      )
      .then(dbFriend => res.json(dbFriend))
      .catch(err => res.status(422).json(err));
  }
};
