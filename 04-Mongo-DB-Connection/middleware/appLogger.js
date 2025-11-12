const express = require("express");

const appLogger = (request, response, next) => {
  const url = request.url;
  const method = request.method;
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();
  console.log(`${url} - ${method} - ${currentDate} - ${currentTime}`);
  next();
};

module.exports = appLogger;
