import express from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";

import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { generateImage } from "./controllers/image.controller.js";
import {
  loginGithub,
  loginGoogle,
  createAccount,
  getUser,
  logout,
  postPubli,
  likePubli,
  commentPubli,
  followUser,
  getSessionUser,
  exploreUsers,
  searchUsers,
  getFollowers,
  getFollowed,
} from "./controllers/user.controller.js";
import { feed, getPost } from "./controllers/publication.controller.js";

dotenv.config();
const app = express();
app.use(
  session({
    secret: "XyAdrienAdsf123__12e@23",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(passport.initialize());

// Configure Passport strategies for GitHub
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

// Configure Passport strategies for Google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        return done(null, profile);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

app.get("/auth/github/failure", (req, res) => {
  res.send({ error: "Connexion annulé" });
});

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

// Endpoint for image controller
app.post("/generate", generateImage);

// Endpoint for GitHub authentication
app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login&message=connection github failed`,
  }),
  loginGithub
);

// Endpoint for Google authentication
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login&message=connection google failed`,
  }),
  loginGoogle
);

// Endpoint for user controller
app.post("/create-account", createAccount);
app.post("/logout", logout);
app.post("/post-publication", postPubli);
app.post("/like-dislike-publication", likePubli);
app.post("/comment-publication", commentPubli);
app.post("/follow-unfollow-user", followUser);
app.post("/user", getUser);
app.post("/session-user", getSessionUser);
app.get("/explore-users", exploreUsers);
app.post("/search-users", searchUsers);
app.post("/get-followers", getFollowers);
app.post("/get-followed", getFollowed);

// Endpoint for publication controller
app.post("/feed", feed);
app.post("/get-publication", getPost);

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
