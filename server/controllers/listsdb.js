const db = require("../models");

module.exports = {
  // POST url example: /api/list/:userid
  create: function(req, res) {
    console.log(`CREATE list for user ${req.params.userid}`);
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
  // DELETE url example: /api/list/:listid/:userid/
  remove: function(req, res) {
    console.log(
      `DELETE userid: ${req.params.userid} || listid: ${req.params.listid}`
    );
    db.List.findByIdAndDelete(req.params.listid)
      .then(dblist => {
        console.log("list deleted");
        return db.User.findByIdAndUpdate(req.params.userid, {
          $pull: { lists: dblist._id }
        })
          .populate("lists")
          .populate("friends");
      })
      .then(dbuser => res.json(dbuser))
      .catch(err => res.status(422).json(err));
  },
  // PUT url example: /api/list/add-gifter/:listid/:userid
  addGifter: function(req, res) {
    console.log(`PUT add gifter `);
    console.log(`${req.params.listid} || ${req.params.userid}`);
    db.List.findByIdAndUpdate(
      req.params.listid,
      { $push: { gifters: req.params.userid } },
      { new: true }
    )
      .then(dbList => res.json(dbList))
      .catch(err => res.status(422).json(err));
  },
  // PUT url example: /api/list/remove-gifter/:listid/:userid
  removeGifter: function(req, res) {
    console.log(`PUT remove gifter `);
    db.List.findByIdAndUpdate(
      req.params.listid,
      { $pull: { gifters: req.params.userid } },
      { new: true }
    )
      .then(dbList => res.json(dbList))
      .catch(err => res.status(422).json(err));
  },
  // GET url example: /api/list
  findAll: function(req, res) {
    console.log(`GET all lists`);
    db.List.find()
      .populate("gifts")
      .then(dbLists => res.json(dbLists));
  },
  findOne: function(req, res) {
    console.log(`GET one list`);
    db.List.findById(req.params.listid)
      .then(dbList => res.json(dbList))
      .catch(err => res.status(422).json(err));
  }
};
