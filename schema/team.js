const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Teamschema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: "project",
  },
  TeamID: {
    type: String,
  },
  description: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  goals: [
    {
      type: String,
    },
  ],
  intern: [
    {
      intern: {
        type: Schema.Types.ObjectId,
        ref: "internprogress",
      },
    },
  ],
  progress: {
    completed: {
      type: Number,
    },
    ongoing: {
      type: Number,
    },
    hold: {
      type: Number,
    },
    removed: {
      type: Number,
    },
  },
});

module.exports = mongoose.model("team", Teamschema);
