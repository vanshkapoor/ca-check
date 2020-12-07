const express = require("express");
const router = express.Router();
let validate = require("express-validation");
let validation = require("./services/validations");
let Controller = require("./controller");
const passport = require("passport");

// router.post("/user/login", validate(validation.login), controller.user.main.login);
// router.post(
//   "/user/register",
//   validate(validation.register),
//   controller.user.main.register
// );
// router.get(
//   "/user/current",
//   passport.authenticate("jwt", { session: false }),
//   controller.user.main.current
// );
// router.get(
//   "/user/auth/current",
//   controller.user.main.authenticateMiddleware,
//   controller.user.main.maincurrauth
// );

// router.post(
//   "/user/project/create",
//   passport.authenticate("jwt", { session: false }),
//   controller.projects.project.create
// );

// router.get(
//   "/user/project/viewall",
//   passport.authenticate("jwt", { session: false }),
//   controller.projects.project.show
// );

// router.get(
//   "/user/project/:id",
//   passport.authenticate("jwt", { session: false }),
//   controller.projects.project.showByID
// );

// router.post(
//   "/team/create",
//   passport.authenticate("jwt", { session: false }),
//   controller.teams.main.createTeam
// );

// router.get(
//   "/team/viewall/:id",
//   passport.authenticate("jwt", { session: false }),
//   controller.teams.main.viewAllTeamsForProject
// );

// router.get(
//   "/team/view/:id",
//   passport.authenticate("jwt", { session: false }),
//   controller.teams.main.viewTeamById
// );

// router.post(
//   "/intern/join",
//   passport.authenticate("jwt", { session: false }),
//   controller.intern.intern.createIntern
// );

// router.get(
//   "/user/intern/view",
//   passport.authenticate("jwt", { session: false }),
//   controller.intern.intern.viewIntern
// );

// router.post(
//   "/intern/addTask",
//   passport.authenticate("jwt", { session: false }),
//   controller.intern.intern.addTasks
// );

// router.post(
//   "/intern/updateTask",
//   passport.authenticate("jwt", { session: false }),
//   controller.intern.intern.updateTask
// );

// router.post(
//   "/user/invite",
//   passport.authenticate("jwt", { session: false }),
//   controller.user.main.inviteUser
// );

// router.post(
//   "/user/addnote",
//   passport.authenticate("jwt", { session: false }),
//   controller.projects.project.addNotes
// );

// router.post(
//   "/user/addgoal",
//   passport.authenticate("jwt", { session: false }),
//   controller.projects.project.addGoals
// );
router.get("/check", (req, res) => {
  res.status(200).json({ message: "success" });
});
router.post("/create", Controller.Blogs.content.Create);
router.get("/view", Controller.Blogs.content.View);
router.get("/trends", Controller.Blogs.content.GetTop);
router.post("/updatecount/:id", Controller.Blogs.content.UpdateCount);
router.get("/view/:id", Controller.Blogs.content.ViewByid);
router.get("/slugview/:id", Controller.Blogs.content.FindbySlug);
router.get("/category/:id", Controller.Blogs.content.FindByCategory);

module.exports = router;
