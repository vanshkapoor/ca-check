const User = require("../../schema/user");
const Project = require("../../schema/project");

module.exports.create = (req, res) => {
  let check = {
    user: req.user.id,
    name: req.body.name,
  };

  Project.find(check)
    .then((data) => {
      if (data.length > 0) {
        return res.status(201).json({
          message: "project with this name already exists in your account",
          data: data,
        });
      } else {
        req.body.user = req.user.id;

        Project.create(req.body)
          .then((data) => {
            return res.status(200).json({ message: "success", data: data });
          })
          .catch((err) => {
            return res.status(400).json({ message: "error", error: err });
          });
      }
    })
    .catch((err) => {
      return res.status(400).json({ message: "error" });
    });
};

module.exports.show = (req, res) => {
  let check = { user: req.user.id };
  Project.find(check)
    .then((data) => {
      return res.status(200).json({ message: "success", data: data });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ message: "error" });
    });
};

module.exports.showByID = (req, res) => {
  let check = {
    user: req.user.id,
    _id: req.params.id,
  };
  Project.find(check)
    .then((data) => {
      return res.status(200).send({ data: data });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ message: "error" });
    });
};

module.exports.addNotes = (req, res) => {
  Project.findById(req.body.pid).then((data) => {
    let obj = {
      name: req.body.name,
      priority: req.body.priority,
    };
    data.notes.push(obj);
    data
      .save(data)
      .then((objdata) => {
        return res.status(200).json({ message: "success", data: objdata });
      })
      .catch((err) => {
        return res.status(400).json({ message: "error" });
      });
  });
};

module.exports.addGoals = (req, res) => {
  Project.findById(req.body.pid).then((data) => {
    let obj = {
      name: req.body.name,
      statuts: req.body.statuts,
    };
    data.goals.push(obj);
    data
      .save(data)
      .then((objdata) => {
        return res.status(200).json({ message: "success", data: objdata });
      })
      .catch((err) => {
        return res.status(400).json({ message: "error" });
      });
  });
};
