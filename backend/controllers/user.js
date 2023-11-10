const User = require("../models/user");

exports.authorize = (req, res, next) => {
  const userToken = req.query.token;

  if (!userToken) {
    res.status(401).send({ message: "Unauthorized" });
  } else {
    User.fetchAll((users) => {
      const user = users.find((item) => item.token === userToken);
      if (!user) {
        res.status(401).send({ message: "Unauthorized" });
      } else {
        next();
      }
    });
  }
};
