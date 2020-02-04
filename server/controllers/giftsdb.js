const db = require("../models");

module.exports = {
  // POST url example: /api/gift/:listid
  create: function(req, res) {
    console.log(`CREATE gift to list ${req.params.listid}`);
    console.log(`gift info: ${JSON.stringify(req.body)}`);
    db.Gift.create(req.body)
      .then(dbGift => {
        dbGift.lists.push(req.params.listid);
        dbGift.save();
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
  // PUT url example: /api/gift/:giftid/:listid
  addGiftToList: function(req, res) {
    console.log(
      `UPDATE add gift to list ${req.params.giftid} || list ${req.params.listid}`
    );
    db.Gift.findById(req.params.giftid)
      .then(dbGift => {
        dbGift.lists.push(req.params.listid);
        dbGift.save();
        db.List.findById(req.params.listid).then(dbList => {
          dbList.gifts.push(req.params.giftid);
          dbList.save();
          res.json(dbList);
        });
      })
      .catch(err => res.status(422).json(err));
  },
  // PUT url example: /api/gift/:giftid
  update: function(req, res) {
    console.log(`UPDATE gift ${req.params.giftid}`);
    db.Gift.findByIdAndUpdate(req.params.giftid, req.body)
      .then(dbGift => res.json(dbGift))
      .catch(err => res.status(422).json(err));
  },
  // DELETE url example: /api/gift/:giftid
  remove: function(req, res) {
    console.log(`REMOVE gift ${req.params.giftid}`);
    db.Gift.findByIdAndDelete(req.params.giftid)
      .populate("lists")
      .then(dbGift => {
        console.log("gift deleted");
        console.log(dbGift);
        dbGift.lists.forEach(list => {
          removeGiftFromLists(list._id, dbGift._id);
        });
        res.JSON(dbGift);
      })
      .catch(err => res.status(422).json(err));
  },
  findAll: function(req, res) {
    console.log(`GET all gifts`);
    db.Gift.find()
      .populate("lists")
      .then(dbGifts => res.json(dbGifts))
      .catch(err => res.status(422).json(err));
  }
};

const removeGiftFromLists = (listid, giftid) => {
  db.List.findByIdAndUpdate(
    listid,
    {
      $pull: { gifts: giftid }
    },
    { new: true }
  )
    .then(dbList => dbList)
};
