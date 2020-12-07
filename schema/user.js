const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Userschema = new Schema({
  name: {
    type: String,
    required: true,
    min: 3,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  invites: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      viewed: {
        type: Boolean,
        // default: false,
      },
      team: {
        type: Schema.Types.ObjectId,
        ref: "team",
      },
      TeamID: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("user", Userschema);
