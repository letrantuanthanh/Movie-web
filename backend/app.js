const express = require("express");
const bodyParser = require("body-parser");

const userController = require("./controllers/user");
const errorController = require("./controllers/error");

const cors = require("cors");

const app = express();
app.use(cors());

const moviesRoutes = require("./routes/movies");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(userController.authorize);

app.use(moviesRoutes);

app.use(errorController.get404);

app.listen(5000, () => {
  console.log("Server start at port 5000");
});
