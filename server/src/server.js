import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import notesRoute from "./routes/notes.routes.js";
import connectDB from "./db/index.js";
import rateLimter from "./middlewares/rateLimiter.middlewares.js";

dotenv.config({
  path: "./.env",
});

const app = express();
const PORT = process.env.PORT || 8080;

//middlewares
app.use(cors());
app.use(express.json());
app.use(rateLimter);

//middleware example
// app.use((req, res, next) => {
//   console.log(`Req method is ${req.method} and Req URL is ${req.url}`);
// });

app.use("/api/notes", notesRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
  });
});
