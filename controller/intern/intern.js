const User = require("../../schema/user");
const Internprogress = require("../../schema/InternProgress");
const Team = require("../../schema/team");
var atob = require("atob");

// JOINS a team as intern by entering the TeamID
module.exports.createIntern = (req, res) => {
  let teamID = atob(req.body.TeamID);
  // let name = teamID.split("-")[0];
  let project = teamID.split("-")[0];
  //   console.log(project);

  Team.findOne({ TeamID: req.body.TeamID, project: project })
    .then((data) => {
      let obj = {};
      obj.user = req.user.id;
      obj.teamname = data.name;
      obj.team = data._id;
      console.log(data._id);
      let check = {};
      check.user = req.user.id;
      check.team = data._id;
      console.log(check);
      Internprogress.find(check).then((interndata) => {
        if (interndata.length > 0) {
          return res.status(201).json({ message: "already joined" });
        }
        Internprogress.create(obj)
          .then((ird) => {
            Team.findById(obj.team).then((teamdata) => {
              teamdata.intern.unshift(ird._id);
              teamdata.save(teamdata).then((objdata) => {
                return res.status(200).json({ message: "success", data: objdata });
              });
            });
          })
          .catch((err) => {
            return res.status(400).json({ message: "Error" });
          });
      });
    })
    .catch((err) => {
      return res.status(400).json({ message: "Error" });
    });
};

module.exports.viewIntern = (req, res) => {
  Internprogress.find({ user: req.user.id })
    .then((data) => {
      return res.status(200).json({ data });
    })
    .catch((err) => {
      return res.status(400).json({ message: "Error" });
    });
};

module.exports.addTasks = (req, res) => {
  Internprogress.findById(req.body.internId)
    .then((data) => {
      data.tasks.push(req.body);
      data.save(data).then((objdata) => {
        return res.status(200).json({ message: "success", data: objdata });
      });
    })
    .catch((err) => {
      return res.status(400).json({ message: "Error" });
    });
};

module.exports.updateTask = (req, res) => {
  Internprogress.findById(req.body.internId)
    .then((data) => {
      if (data.tasks.filter((dt) => dt._id.toString() === req.body.tid).length == 0) {
        return res.status(201).jsn({ message: "intern with this task doesnt exists" });
      }
      let tindex = data.tasks.map((dt) => dt._id.toString()).indexOf(req.body.tid);
      if (req.body.name) {
        data.tasks[tindex].name = req.body.name;
      }
      if (req.body.subdetail) {
        data.tasks[tindex].subdetail = req.body.subdetail;
      }
      if (req.body.priority) {
        data.tasks[tindex].priority = req.body.priority;
      }
      if (req.body.status) {
        data.tasks[tindex].status = req.body.status;
      }
      if (req.body.allot) {
        data.tasks[tindex].allot = req.body.allot;
      }
      // return res.status(400).json({ data: data.tasks[tindex] });
      data
        .save(data)
        .then((objdata) => {
          return res.status(200).json({ message: "success", data: objdata });
        })
        .catch((err) => {
          return res.status(400).json({ message: "Error1" });
        });
    })
    .catch((err) => {
      return res.status(400).json({ message: "Error2" });
    });
};
