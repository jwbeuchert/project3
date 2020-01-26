const db = require("../models");
console.log("i'm running?")

db.User.findById({ _id: "5e2b4ba0a3aabe75583ea169" }).then(dbuser => {
    console.log("ITS RUNNING")
    console.log(dbuser)
      dbuser.lists.push({name: "List 1"})
      dbuser.save()
    })
    .catch(err => res.status(422).json(err));