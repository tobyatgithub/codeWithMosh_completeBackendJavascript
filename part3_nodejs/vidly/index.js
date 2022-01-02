const mongoose = require("mongoose");
const genres = require("./routes/genres");
const customers = require("./routes/customers.js");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/genres")
  .then(() => console.log("Connected to mongoDB..."))
  .catch((err) => console.error("Could not connect to mongoDB...", err));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
