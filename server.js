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
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
