import connection from "../config/bd.js";
import { User } from "../models/user.js";
import { postOnPostimg } from "./image.controller.js";
import dotenv from "dotenv";
dotenv.config();

export async function loginGithub(req, res) {
  try {
    const user = req.user;
    const [result] = await connection.execute("call Login(?)", [user.id]);
    if (result[0][0].notExist) {
      req.session.tempUserId = user.id;
      res.redirect(`${process.env.FRONTEND_URL}/create-account`);
    } else {
      req.session.user = {
        id: result[0][0].id,
        username: result[0][0].username,
        img: result[0][0].profile_picture,
      };
      res.redirect(`${process.env.FRONTEND_URL}/`);
    }
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
}
export async function loginGoogle(req, res) {
  try {
    const user = req.user;
    const [result] = await connection.execute("call Login(?)", [user.id]);
    if (result[0][0].notExist) {
      req.session.tempUserId = user.id;
      res.redirect(`${process.env.FRONTEND_URL}/create-account`);
    } else {
      req.session.user = {
        id: result[0][0].id,
        username: result[0][0].username,
        img: result[0][0].profile_picture,
      };
      res.redirect(`${process.env.FRONTEND_URL}/`);
    }
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
}

export async function createAccount(req, res) {
  try {
    const { username } = req.body;
    if (req.session.tempUserId) {
      const [result] = await connection.execute("call CreateAccount(?,?,?)", [
        req.session.tempUserId,
        username,
        `https://boring-avatars-api.vercel.app/api/avatar?size=500&variant=beam&name=${username}`,
      ]);
      if (result[0][0].error) {
        res.send({ error: result[0][0].message });
      } else {
        req.session.user = {
          id: result[0][0].id,
          username: result[0][0].username,
          img: result[0][0].profile_picture,
        };
        delete req.session.tempUserId;
        res.send({ success: "account create" });
      }
    } else {
      throw new Error("tempUserId undefined");
    }
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
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
    const [result] = await connection.execute("call GetUserInfo(?,?)", [
      req.session.user?.id || 0,
      username,
    ]);
    if (result.error) {
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
    const buffer = Buffer.from(req.session.generateImage, "base64");
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

export async function exploreUsers(req, res) {
  try {
    const result = await connection.execute("call ExploreUser(?)", [
      req.session.user?.id || 0,
    ]);
    res.send(result[0][0]);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
}

export async function searchUsers(req, res) {
  try {
    const { username } = req.body;
    const result = await connection.execute("call SearchUser(?,?)", [
      req.session.user?.id || 0,
      username,
    ]);
    res.send(result[0][0]);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
}
