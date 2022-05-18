import { Schema, model, Document } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface Image {
  url: string;
  name: string;
  size: number;
}

export interface IMovie {
  name: string;
  details: string;
  price: number;
  image: Image;
}

type MovieDocument = IMovie & Document;

// 2. Create a Schema corresponding to the document interface.
const imageSchema = new Schema<Image>(
  {
    url: String,
    name: String,
    size: Number,
  },
  {
    _id: false,
  }
);

const movieSchema = new Schema<MovieDocument>({
  name: { type: String, required: true },
  details: String,
  image: imageSchema,
});

// 3. Create a Model.
export const Movie = model<MovieDocument>("movies", movieSchema);
