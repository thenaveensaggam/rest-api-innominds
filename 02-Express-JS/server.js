const express = require("express");
const apiRouter = require("./routes/apiRoute");
const userRouter = require("./routes/userRoute");

const app = express();

app.get("/", (request, response) => {
  response.status(200);
  response.json({
    message: "Hello to Express JS ",
  });
});

// routing configuration
app.use("/api", apiRouter);
app.use("/user", userRouter);

const hostname = "127.0.0.1";
const port = 5000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
