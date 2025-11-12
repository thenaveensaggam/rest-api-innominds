const express = require("express");

const getApi = (request, response) => {
  response.status(200);
  response.json({
    message: "Welcome to API Router GET",
  });
};

const postAPI = (request, response) => {
  response.status(200);
  response.json({
    message: "Welcome to API Router POST",
  });
};

module.exports = {
  getApi,
  postAPI
};
