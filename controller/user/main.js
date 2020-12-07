const User = require("../../schema/user");
const utility = require("../../services/utility");
const jwt = require("jsonwebtoken");

module.exports.authenticateMiddleware = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, "secret", function (err, decoded) {
      if (err) {
        return res.status(401).json({
          error: err,
          success: false,
          message: "Failed to authenticate token",
          tokenAutorization: false,
        });
      } else {
        // if (decoded.userType == "student") {
        //   req.decoded = decoded;
        //   next();
        // } else {
        //   return res
        //     .status(401)
        //     .json({
        //       success: false,
        //       message: "Failed to authenticate token",
        //       tokenAutorization: false,
        //     });
        // }
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: "no token provided",
    });
  }
};

module.exports.register = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res
          .status(400)
          .json({ message: "User already resgitered with this email" });
      } else {
        utility.hashit(req.body.password, (err, hash) => {
          if (err) {
            return res.status(400).json({ message: "error in hashing" });
          }
          req.body.password = hash;
          User.create(req.body)
            .then((response) => {
              return res
                .status(200)
                .json({ message: "user successfully created", response });
            })
            .catch((error) => {
              return res.status(400).json({ message: "error1" });
            });
        });
      }
    })
    .catch((error) => {
      return res.status(400).json({ message: "error2" });
    });
};

module.exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: "no user" });
      }
      utility.checkpassword(req.body.password, user.password, (err, match) => {
        if (err) {
          return res.status(400).json({ message: "error3" });
        }
        if (match) {
          let payload = {
            email: req.body.email,
            name: user.name,
            id: user.id,
          };
          let token = utility.jwtToken(payload);
          return res.json({ message: "successfull", token: "bearer " + token });
        } else {
          return res.status(400).json({ message: "wrong password" });
        }
      });
    })
    .catch((err) => {
      return res.status(400).json({ message: "error2" });
    });
};

module.exports.current = (req, res) => {
  return res.json({ user: req.user });
};

module.exports.maincurrauth = (req, res) => {
  return res.json({ user: req.decoded });
};

module.exports.inviteUser = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((data) => {
      if (
        data.invites.filter((invs) => invs.team.toString() == req.body.team).length > 0
      ) {
        return res.status(201).json({ message: "Invite already sent" });
      }
      let obj = {
        user: req.user.id,
        team: req.body.team,
        TeamID: req.body.TeamID,
        viewed: false,
      };
      data.invites.push(obj);
      data
        .save(data)
        .then((objdata) => {
          return res.status(200).json({ message: "success", data: objdata });
        })
        .catch((err) => {
          return res.status(400).json({ message: err });
        });
    })
    .catch((err) => {
      return res.status(400).json({ message: err });
    });
};
