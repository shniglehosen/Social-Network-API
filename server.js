const express = require("express");
const db = require("./config/connection");
const path = require("path");
const routes = require("./routes");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public"))); // allows access to the css and js files on the client-side

app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running at http://localhost:${PORT}`);
  });
});