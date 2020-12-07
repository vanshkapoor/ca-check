const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Projectschema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  notes: [
    {
      name: {
        type: String,
      },
      priority: {
        type: Number,
        default: null,
      },
    },
  ],
  goals: [
    {
      name: {
        type: String,
      },
      status: {
        type: String,
      },
    },
  ],
  teams: [
    {
      name: {
        type: String,
      },
      team: {
        type: Schema.Types.ObjectId,
        ref: "team",
      },
      teamID: {
        type: String,
      },
      description: {
        type: String,
      },
    },
  ],
  intern: [
    {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("project", Projectschema);
