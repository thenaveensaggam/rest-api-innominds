const express = require("express");
const UserTable = require("../database/schema/userSchema");
const EventTable = require("../database/schema/eventSchema");
const { validationResult } = require("express-validator");

const uploadEvent = async (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  try {
    const { id } = request.user;
    // check if the user exists and it should be an Admin
    const user = await UserTable.findById(id);
    if (!user) {
      return response.status(400).json({ errors: [{ msg: "User not found" }] });
    }

    // check if the user is an Admin
    if (user.role !== "ADMIN") {
      return response
        .status(400)
        .json({ errors: [{ msg: "User is not an Admin" }] });
    }

    // read the form data
    const { name, imageUrl, price, date, type, description } = request.body;

    // check if the event already exists
    const event = await EventTable.findOne({ name: name });
    if (event) {
      return response
        .status(400)
        .json({ errors: [{ msg: "Event already exists" }] });
    }

    // upload events
    const newEvent = await new EventTable({
      name: name,
      imageUrl: imageUrl,
      price: price,
      date: date,
      type: type,
      description: description,
    }).save();

    if (!newEvent) {
      return response
        .status(400)
        .json({ errors: [{ msg: "Event is not uploaded" }] });
    }
    return response.status(200).json({
      message: "Event is uploaded successfully",
      data: newEvent,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ errors: [{ msg: error.message }] });
  }
};

const getFreeEvents = async (request, response) => {
  try {
    const events = await EventTable.find({ type: "FREE" });
    if (!events) {
      return response
        .status(400)
        .json({ errors: [{ msg: "Events not found" }] });
    }
    return response.status(200).json({
      message: "Events are found successfully",
      data: events,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ errors: [{ msg: error.message }] });
  }
};

const getPaidEvents = async (request, response) => {
  try {
    const events = await EventTable.find({ type: "PAID" });
    if (!events) {
      return response
        .status(400)
        .json({ errors: [{ msg: "Events not found" }] });
    }
    return response.status(200).json({
      message: "Events are found successfully",
      data: events,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ errors: [{ msg: error.message }] });
  }
};

const getEventById = async (request, response) => {
  try {
    const { eventId } = request.params;
    const event = await EventTable.findById(eventId);
    if (!event) {
      return response
        .status(400)
        .json({ errors: [{ msg: "Event not found" }] });
    }
    return response.status(200).json({
      message: "Event is found successfully",
      data: event,
    });
  } catch (error) {}
};

module.exports = {
  uploadEvent,
  getFreeEvents,
  getPaidEvents,
  getEventById,
};
