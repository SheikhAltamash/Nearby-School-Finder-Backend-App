if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require("express");
const bodyParser = require("body-parser");
const schoolRoutes = require("./routes/schoolRoutes");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

app.use("/api", schoolRoutes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
