const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "datas",
  "movieList.json"
);

const getMoviesFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Movies {
  static fetchAll(cb) {
    getMoviesFromFile(cb);
  }
};
