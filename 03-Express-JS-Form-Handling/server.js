const express = require("express");
const dotenv = require("dotenv");

const apiRouter = require("./routes/apiRoute");
const userRouter = require("./routes/userRoute");

const app = express();

// configure dotenv
dotenv.config({ path: "./.env" });

// express to handle the form data
app.use(express.json());

app.get("/", (request, response) => {
  response.status(200);
  response.json({
    message: "Hello to Express JS ",
  });
});

// routing configuration
app.use("/api", apiRouter);
app.use("/user", userRouter);

const hostname = process.env.HOST_NAME;
const port = process.env.PORT;

if (hostname && port) {
  app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}
