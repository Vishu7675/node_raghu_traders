const express = require("express");
require("dotenv").config();
const { errorHandler } = require("./middleware/errorHandler");
const connectionDb = require("./config/dbConnection");
connectionDb();
const app = express();

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use(errorHandler);
app.listen(8080, "0.0.0.0", () => {
  console.log("Server is running on port 8080");
});
