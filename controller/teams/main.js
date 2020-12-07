const User = require("../../schema/user");
const Team = require("../../schema/team");
const Project = require("../../schema/project");
var btoa = require("btoa");

module.exports.create = (req, res) => {
  let check = {
    user: req.user.id,
    project: req.body.project,
    name: req.body.name,
  };
  Team.find(check)
    .then((data) => {
      if (data.length > 0) {
        return res.status(201).json({ message: "team name already exists" });
      } else {
        req.body.user = req.user.id;
        Team.create(req.body)
          .then((data) => {
            return data;
          })
          .then((data) => {
            Project.findById(req.body.project).then((projectdata) => {
              const newteam = {
                name: data.name,
                team: data._id,
              };
              projectdata.teams.unshift(newteam);
              projectdata.save(projectdata).then((prdata) => res.json(prdata));
            });
            // return res.json({ message: "check", data });
          })
          .catch((err) => {
            return res.status(400).send({ message: "error" });
          });
      }
    })
    .catch((err) => {
      return res.status(400).send({ message: "error" });
    });
};

// OPTIMISED CREATE VERSION
module.exports.createTeam = (req, res) => {
  req.body.user = req.user.id;
  var date = new Date();
  // date = date.getDay() + "" + date.getDate() + "" + date.getFullYear();
  var tid = req.body.project + "-" + date.getTime();
  var TeamID = btoa(tid);

  req.body.TeamID = TeamID;
  console.log(req.body);
  Team.create(req.body).then((data) => {
    Project.findById(req.body.project)
      .then((projectData) => {
        // if (projectData.teams.filter((teams) => teams.name == req.body.name).length > 0) {
        //   return res.status(401).json({ message: "team name already exists" });
        // }

        let newTeam = {
          name: data.name,
          team: data._id,
          description: data.description,
          teamID: TeamID,
        };

        projectData.teams.unshift(newTeam);
        projectData
          .save(projectData)
          .then((prdata) => {
            return res.status(200).json({ message: "success", data: prdata });
          })
          .catch((err) => {
            return res.status(400).send({ message: "error" });
          });
      })
      .catch((err) => {
        return res.status(400).send({ message: "error" });
      });
  });
};

module.exports.viewAllTeamsForProject = (req, res) => {
  let check = {
    user: req.user.id,
    project: req.params.id,
  };
  Team.find(check)
    .then((data) => {
      return res.status(200).json({ message: "success", data: data });
    })
    .catch((err) => {
      return res.status(400).json({ message: "error" });
    });
};

module.exports.viewTeamById = (req, res) => {
  let check = {
    user: req.user.id,
    _id: req.params.id,
  };
  Team.findById(check)
    .then((data) => {
      return res.status(200).json({ message: "success", data: data });
    })
    .catch((err) => {
      return res.status(00).json({ message: "error" });
    });
};
