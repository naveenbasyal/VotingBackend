const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const imageRoutes = require("./routes/images");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5200;

app.use(cors());
app.use(express.json());

// db connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // Start the server
    app.listen(PORT, () => {
      console.log(`DB Connected and Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use("/api", imageRoutes);
