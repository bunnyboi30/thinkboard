import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import notesRoute from "./routes/notes.routes.js";
import connectDB from "./db/index.js";
import rateLimter from "./middlewares/rateLimiter.middlewares.js";

dotenv.config({
  path: "./.env",
});

const app = express();
const PORT = process.env.PORT || 8080;
const __dirname = path.resolve();

//middlewares
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    }),
  );
}
app.use(express.json());
app.use(rateLimter);

//middleware example
// app.use((req, res, next) => {
//   console.log(`Req method is ${req.method} and Req URL is ${req.url}`);
// });

app.use("/api/notes", notesRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
  });
});
