import connection from "../config/bd.js";
import { User } from "../models/user.js";

export async function createAccount(req, res) {
  const passwordRegex =
    /^(?=.{8,64}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(?:_|[^\w\s])).*$/;
  const valid = (password) => passwordRegex.test(password);
  try {
    const { username, email, password } = req.body;
    if (!valid(password)) {
      return res.status(400).json({
        error:
          "Password must be 8-64 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character.",
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
      throw new Error("User is not connected");
    }
    req.session.destroy();
    res.status(200).json({ success: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export function getUser(req, res) {
  try {
    if (req.session.user === undefined) {
      throw new Error("User is not connected");
    }
    res.json(req.session.user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
