const db = require("../models");

module.exports = {
  // GET url example /api/user
  findAll: function(req, res) {
    console.log("FIND ALL")
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
    console.log("FIND BY ID")
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
    console.log("FIND ONE")
    let param = req.query.email
    db.User.findOne({ email: param})
      .populate("lists")
      .populate("friends")
      .populate({
        path: "lists",
        populate: { path: "gifts" }
      })
      .then(dbuser => {
        if (dbuser) { 
          res.json(dbuser)
        } else {
          res.json(null)
        }
      });
  },
  // POST url example /api/user
  createOrFindOne: function(req, res) {
    console.log("CREATE OR FIND")
    db.User.findOne(req.body)
      .populate("lists")
      .populate("friends")
      .populate({
        path: "lists",
        populate: { path: "gifts" }
      })
      .then(user => {
        if (!user) {
          db.User.create(req.body).then(newUser => {
            db.List.create({ name: "All Gifts" })
              .then(newList => {
                newUser.lists.push(newList._id);
                return newUser.save();
              })
              .then(res.json(newUser));
          });
        } else {
          res.json(user);
        }
      });
  },
  // PUT url example /api/user/:currentUserId/:friendId
  addFriend: function(req, res) {
    console.log("ADD FRIEND")
    db.User.findById(req.params.friendId)
      .populate("lists")
      .populate("friends")
      .populate({
        path: "lists",
        populate: { path: "gifts" }
      })
      .then(dbFriend => {
        return db.User.findOneAndUpdate(
          { _id: req.params.currentUserId },
          { $push: { friends: dbFriend._id } },
          { new: true }
        )
          .populate("friends")
          .populate("lists");
      })
      .then(dbFriend => res.json(dbFriend))
      .catch(err => res.status(422).json(err));
  }
};
