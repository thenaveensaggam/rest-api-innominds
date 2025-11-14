const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectToDB = require("./database/connection");
const userRouter = require("./routes/userRoute");
const eventRouter = require("./routes/eventRoute");

const app = express();

// configure dotenv
dotenv.config({ path: "./.env" });

// use form data
app.use(express.json());
app.use(cors());

app.get("/", (request, response) => {
  response.status(200);
  response.json({
    message: "Hello to Express JS ",
  });
});

// router configuration
app.use("/user", userRouter);
app.use("/event", eventRouter);

const hostname = process.env.HOST_NAME;
const port = process.env.PORT;

if (hostname && port) {
  app.listen(port, hostname, async () => {
    await connectToDB();
    console.log(`Server running at http://${hostname}:${port}/`);
  });
} else {
  console.log("Error loading the server...");
}
