import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import {
  generateImage,
  postOnPostimg,
} from "./controllers/image.controller.js";
import {
  createAccount,
  getUser,
  login,
  logout,
} from "./controllers/user.controller.js";

dotenv.config();

const app = express();
app.use(
  session({
    secret: "XyAdrienAdsf123__12e@23",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(express.json({ limit: "10mb" }));

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

// Endpoint for image controller
app.post("/generate", generateImage);
app.post("/post", postOnPostimg);

// Endpoint for user controller
app.post("/create-account", createAccount);
app.post("/login", login);
app.post("/logout", logout);
app.get("/user", getUser);

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
