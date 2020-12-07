const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Internschema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  teams: [
    {
      project: {
        type: Schema.Types.ObjectId,
        ref: "project",
      },
      name: {
        type: String,
      },
      team: {
        type: Schema.Types.ObjectId,
        ref: "team",
      },
      internProgress: {
        type: Schema.Types.ObjectId,
        ref: "internprogress",
      },
    },
  ],
  invited: [
    {
      name: {
        type: String,
      },
      team: {
        type: Schema.Types.ObjectId,
        ref: "team",
      },
      sender: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
});

module.exports = mongoose.model("intern", Internschema);
