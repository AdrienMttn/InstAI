import express from "express";
import dotenv from "dotenv";
import {
  generateImage,
  postOnPostimg,
} from "./controllers/image.controllers.js";

dotenv.config();

const app = express();
app.use(express.json({ limit: "10mb" }));

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.post("/generate", generateImage);

app.post("/post", postOnPostimg);

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
