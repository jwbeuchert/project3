const db = require("../models");

module.exports = {
  // GET url example /api/user
  findAll: function(req, res) {
    console.log("FIND ALL");
    db.User.find()
      .populate("lists")
      .populate("friends")
      .populate({
        path: "lists",
        populate: { path: "gifts" }
      })
      .then(dbUsers => res.json(dbUsers))
      .catch(err => res.status(422).json(err));
  },
  // GET url example /api/user/:userId
  findById: function(req, res) {
    console.log("FIND BY ID");
    db.User.findById(req.params.id)
      .populate("lists")
      .populate("friends")
      .populate({
        path: "lists",
        populate: { path: "gifts" }
      })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  // get url example /api/user/email with object sent via param data
  // for example axios.get('/user/one', { params: { email: any@email.com }
  findOneByEmail: function(req, res) {
    console.log("FIND ONE");
    let param = req.query.email;
    db.User.findOne({ email: param })
      .populate("lists")
      .populate("friends")
      .populate({
        path: "lists",
        populate: { path: "gifts" }
      })
      .then(dbuser => {
        if (dbuser) {
          res.json(dbuser);
        } else {
          res.json(null);
        }
      });
  },
  // POST url example /api/user
  createOrFindOne: function(req, res) {
    console.log("CREATE OR FIND");
    db.User.findOne(req.body)
      .populate("lists")
      .populate("friends")
      .populate({
        path: "lists",
        populate: { path: "gifts" }
      })
      .then(user => {
        if (!user) {
          db.List.create({ name: "All Gifts" }).then(newList => {
            db.User.create(req.body)
              .then(newUser => {
                return db.User.findByIdAndUpdate(
                  newUser._id,
                  { $push: { lists: newList._id } },
                  { new: true }
                ).populate("lists");
              })
              .then(popUser => res.json(popUser));
          });
        } else {
          res.json(user);
        }
      });
  },
  // PUT url example /api/user/:currentUserId/:friendId
  addFriend: function(req, res) {
    console.log(
      `PUT add friend ${req.params.currentUserId} || ${req.params.friendId}`
    );
    db.User.findByIdAndUpdate(
      req.params.currentUserId,
      { $push: { friends: req.params.friendId } },
      { new: true }
    )
      .populate("friends")
      .populate("lists")
      .populate({
        path: "lists",
        populate: { path: "gifts" }
      })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  // DELETE url example /api/user/:currentUserId/:friendId
  removeFriend: function(req, res) {
    console.log(
      `DELETE remove friend ${req.params.currentUserId} || ${req.params.friendId}`
    );
    db.User.findByIdAndUpdate(
      req.params.currentUserId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .populate("friends")
      .populate("lists")
      .populate({
        path: "lists",
        populate: { path: "gifts" }
      })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  }
};
