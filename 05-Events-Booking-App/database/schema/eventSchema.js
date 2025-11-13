const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["FREE", "PAID"],
      default: "PAID",
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const EventTable = new mongoose.model("events", eventSchema);
module.exports = EventTable;
