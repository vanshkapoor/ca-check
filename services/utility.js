const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.hashit = (payload, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      callback(err, null);
    }
    bcrypt.hash(payload, salt, (err, hash) => {
      callback(err, hash);
    });
  });
};

module.exports.jwtToken = (payload) => {
  let token = jwt.sign(payload, "secret", { expiresIn: "365 days" });
  return token;
};

module.exports.checkpassword = (psswd, hash, callback) => {
  bcrypt.compare(psswd, hash, (err, check) => {
    callback(err, check);
  });
};
