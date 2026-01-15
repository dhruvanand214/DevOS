require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", require("./routes/task.routes"));
app.use("/api/notes", require("./routes/note.routes"));

app.listen(4000, () =>
  console.log("Backend running on http://localhost:4000")
);
