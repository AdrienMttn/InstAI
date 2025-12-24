import express from "express";
import session from "express-session";
import {
  generateImage,
  postOnPostimg,
} from "./controllers/image.controller.js";
import {
  createAccount,
  getUser,
  login,
  logout,
  postPubli,
  likePubli,
  commentPubli,
  followUser,
  getSessionUser,
  exploreUsers,
  searchUsers,
} from "./controllers/user.controller.js";
import { feed, getPost } from "./controllers/publication.controller.js";

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

// Endpoint for user controller
app.post("/create-account", createAccount);
app.post("/login", login);
app.post("/logout", logout);
app.post("/post-publication", postPubli);
app.post("/like-dislike-publication", likePubli);
app.post("/comment-publication", commentPubli);
app.post("/follow-unfollow-user", followUser);
app.post("/user", getUser);
app.post("/session-user", getSessionUser);
app.get("/explore-users", exploreUsers);
app.post("/search-users", searchUsers);

// Endpoint for publication controller
app.post("/feed", feed);
app.post("/get-publication", getPost);

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
