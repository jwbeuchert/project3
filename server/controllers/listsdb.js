const db = require("../models");

module.exports = {
  // url example: /api/list/:userid
  create: function(req, res) {
    console.log(`${JSON.stringify(req.body)} and ${req.params.userid}`);
    db.List.create(req.body)
      .then(dblist => {
        console.log("list created");
        return db.User.findByIdAndUpdate(
          req.params.userid,
          { $push: { lists: dblist._id } },
          { new: true }
        )
          .populate("lists")
          .populate("friends");
      })
      .then(dbuser => res.json(dbuser))
      .catch(err => res.status(422).json(err));
  },
  // url example: /api/list/:listid/:userid/
  remove: function(req, res) {
    console.log(`userid: ${req.params.userid} || listid: ${req.params.listid}`);
    db.List.findByIdAndDelete(req.params.listid)
      .then(dblist => {
        console.log("list deleted");
        return db.User.findByIdAndUpdate(
          req.params.userid,
          { $pull: { lists: dblist._id } }
        )
          .populate("lists")
          .populate("friends");
      })
      .then(dbuser => res.json(dbuser))
      .catch(err => res.status(422).json(err));
  }
};
