const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InternProgress = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  teamname: {
    type: String,
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: "team",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  tasks: [
    {
      name: {
        type: String,
      },
      subdetail: {
        type: String,
        lowercase: true,
      },
      priority: {
        type: Number,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      deadlineDate: {
        type: Date,
      },
      deleted: {
        type: Boolean,
      },
      status: ["completed", "in process", "deleted", "on hold", null],
      allot: ["assigned", "self"],
    },
  ],
  progress: {
    type: Number,
  },
  total: { type: Number },
});

module.exports = mongoose.model("internprogress", InternProgress);
