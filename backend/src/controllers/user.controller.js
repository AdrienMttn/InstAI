import connection from "../config/bd.js";
import { User } from "../models/user.js";
import { postOnPostimg } from "./image.controller.js";

export async function createAccount(req, res) {
  const passwordRegex =
    /^(?=.{8,64}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(?:_|[^\w\s])).*$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validPassword = (password) => passwordRegex.test(password);
  const validEmail = (email) => emailRegex.test(email);
  try {
    const { username, email, password } = req.body;
    if (!validPassword(password)) {
      return res.status(400).json({
        error:
          "Password must be 8-64 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character.",
      });
    }
    if (!validEmail(email)) {
      return res.status(400).json({
        error: "Invalid email format.",
      });
    }
    const [result] = await connection.execute("call AddUser(?, ?, ?, ?)", [
      username,
      email,
      password,
      `https://avatar.vercel.sh/${username}?size=500`,
    ]);
    const user = new User(
      result[0][0].id,
      username,
      email,
      result[0][0].profile_picture
    );
    req.session.user = user;
    res.status(201).json({ success: "Account created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const [result] = await connection.execute("call login(?, ?)", [
      email,
      password,
    ]);
    req.session.user = new User(
      result[0][0].id,
      result[0][0].username,
      result[0][0].email,
      result[0][0].profile_picture
    );
    res.status(200).json({ success: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export function logout(req, res) {
  try {
    if (req.session.user === undefined) {
      const error = new Error("User is not connected");
      error.status = 401;
      throw error;
    }
    req.session.destroy();
    res.status(200).json({ success: "Logout successful" });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
}

export async function getUser(req, res) {
  try {
    const { username } = req.body;
    const [result] = await connection.execute("call GetUserInfo(?)", [
      username,
    ]);
    if (result.length === 0) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
    const userInfo = result[0][0];
    const [postsResult] = await connection.execute("call GetUserPost(?)", [
      username,
    ]);
    userInfo.posts = postsResult[0];
    res.json(userInfo);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
}

export async function postPubli(req, res) {
  try {
    if (req.session.user === undefined) {
      const error = new Error("User is not connected");
      error.status = 401;
      throw error;
    }
    const { imgBase64 } = req.body;
    const buffer = Buffer.from(imgBase64, "base64");
    const file = new File([buffer], "1200x680.png", { type: "image/png" });
    const imgUrl = await postOnPostimg(file);
    const [result] = await connection.execute("call AddPost(?, ?)", [
      req.session.user.id,
      imgUrl,
    ]);
    res.status(200).json({ success: "Post created successfully" });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
}

export function getSessionUser(req, res) {
  if (req.session.user === undefined) {
    res.send({});
  }
  res.send(req.session.user);
}

export async function likePubli(req, res) {
  try {
    const { postId } = req.body;
    if (req.session.user === undefined) {
      const error = new Error("User is not connected");
      error.status = 401;
      throw error;
    }
    const userId = req.session.user.id;
    const [result] = await connection.execute("call AddOrRemoveLike(?, ?)", [
      postId,
      userId,
    ]);
    res.status(200).json({ liked: result[0][0].is_liked });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
}

export async function commentPubli(req, res) {
  try {
    if (req.session.user === undefined) {
      const error = new Error("User is not connected");
      error.status = 401;
      throw error;
    }
    const { postId, commentText } = req.body;
    const [result] = await connection.execute("call AddComment(?, ?, ?)", [
      postId,
      req.session.user.id,
      commentText,
    ]);
    res.status(200).json({ success: "Comment added successfully" });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
}
export async function followUser(req, res) {
  try {
    if (req.session.user === undefined) {
      const error = new Error("User is not connected");
      error.status = 401;
      throw error;
    }
    const { userId } = req.body;
    const [result] = await connection.execute(
      "call FollowOrUnfollowUser(?, ?)",
      [req.session.user.id, userId]
    );
    res.status(200).json({ follow: result[0][0].is_following });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
}
