const db = require("../models");

module.exports = {
  // url example: /api/list/:userid
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
  // url example: /api/list/:listid/:userid/
  remove: function(req, res) {
    console.log(`userid: ${req.params.userid} || listid: ${req.params.listid}`)
    db.List.findById(req.params.listid)
      .then(dbList => {
        console.log(dbList)
        dbList.remove()
        return db.User.findById(req.params.userid)
        .then(dbUser => {
          console.log(`${dbUser} ----listid---- ${req.params.listid}`)
          dbUser.lists.remove({ _id: req.params.listid })
          dbUser.save()
        })
      })
      .then(dbList => res.json(dbList))
      .catch(err => res.status(422).json(err));
  }
};
