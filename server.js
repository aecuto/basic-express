const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// headers and query
// localhost:3333/headers-query?test=123
app.get("/headers-query", async (req, res) => {
  res.send({ query: req.query, headers: req.headers });
});

// post
// localhost:3333/movie
app.post("/movie", async (req, res) => {
  res.send({ body: req.body });
});

// get
// localhost:3333/movies
app.get("/movies", async (req, res) => {
  res.send({ msg: "movies list" });
});

// get by id
// localhost:3333/movie/ss123
app.get("/movie/:movieId", async (req, res) => {
  res.send({ msg: "detail movie", params: req.params });
});

// edit by id
// localhost:3333/movie/ss123
app.put("/movie/:movieId", async (req, res) => {
  res.send({ msg: "edit movie", params: req.params });
});

// delete by id
// localhost:3333/movie/ss123
app.delete("/movie/:movieId", async (req, res) => {
  res.send({ msg: "delete movie", params: req.params });
});

const port = 3333;
app.listen(port, function () {
  console.log(`Server is listening on port ${port}`);
});
