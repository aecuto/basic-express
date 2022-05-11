import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";

// Mongo
import connectMongo from "./mongo";
connectMongo();

// Model
import { Movie, IMovie } from "./model";

// App config
const app: Express = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// App CRUD
app.get("/movies", async (req: Request, res: Response) => {
  const movies = await Movie.find();
  res.send(movies);
});

app.post("/movies", async (req: Request, res: Response) => {
  const data: IMovie = {
    name: "test",
    price: 10,
    details: "details",
    image: {
      url: "localhost/image.png",
      name: "image.png",
      size: 3434,
    },
  };
  const movie = await Movie.create(data);

  res.send(movie);
});

// App listen
const port = 3333;
app.listen(port, function () {
  console.log(`Server is listening on port ${port}`);
});
