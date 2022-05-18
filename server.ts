import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import fileUpload, { UploadedFile } from "express-fileupload";

// Mongo
import connectMongo from "./mongo";
connectMongo();

// Model
import { Movie, IMovie } from "./model";

// App config
const port = 3333;
const app: Express = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// File Config
app.use(express.static("uploads"));
app.use(fileUpload());

// App CRUD
app.get("/movies", async (req: Request, res: Response) => {
  const movies = await Movie.find();
  res.send(movies);
});

interface MovieRequest extends Request {
  body: IMovie;
}
app.post("/movies", async (req: MovieRequest, res: Response) => {
  const image = req?.files?.image as UploadedFile;
  const uploadPath = __dirname + "/uploads/" + image.name;

  // Use the mv() method to place the file somewhere on your server
  image.mv(uploadPath, (err) => {
    if (err) console.log(err);
  });

  const data = {
    ...req.body,
    image: {
      url: `http://localhost:${port}/${image.name}`,
      size: image.size,
      name: image.name,
    },
  };
  // const movie = await Movie.create(req.body);

  res.send(data);
});

// App listen
app.listen(port, function () {
  console.log(`Server is listening on port ${port}`);
});
