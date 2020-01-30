const db = require("../models");

module.exports = {
  // POST url example: /api/gift/:listid
  create: function(req, res) {
    console.log("CREATE GIFT")
    console.log("gift: ", req.body);
    db.Gift.create(req.body)
      .then(dbGift => {
        console.log("gift created");
        return db.List.findByIdAndUpdate(
          req.params.listid,
          { $push: { gifts: dbGift._id } },
          { new: true }
        ).populate("gifts");
      })
      .then(dbList => res.json(dbList))
      .catch(err => res.status(422).json(err));
  },
  // PUT url example: /api/gift/:giftid
  update: function(req, res) {
    console.log("UPDATE GIFT")
    db.Gift.findByIdAndUpdate(req.params.giftid, req.body)
      .then(dbGift => res.json(dbGift))
      .catch(err => res.status(422).json(err));
  },
  // DELETE url example: /api/gift/:giftid/:listid
  remove: function(req, res) {
    console.log("REMOVE GIFT")
    console.log(`giftid: ${req.params.giftid} || listid: ${req.params.listid}`);
    db.Gift.findByIdAndDelete(req.params.giftid)
      .then(dbGift => {
        console.log("gift deleted");
        return db.List.findByIdAndUpdate(
          req.params.listid,
          { $pull: { gifts: dbGift._id } }
        )
          .populate("gifts")
      })
      .then(dbList => res.json(dbList))
      .catch(err => res.status(422).json(err));
  }
};
