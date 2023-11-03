const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const taskRouter = require("./tasks");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use("/tasks", taskRouter);

// app.get("/", (req, res) => {
//   res.send("Deployeddd!");
// });

app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}!`);
});
