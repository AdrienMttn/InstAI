import connection from "../config/bd.js";

export async function feed(req, res) {
  try {
    const { dejaVuIds } = req.body;
    const [posts] = await connection.execute("call GetFeed(?, ?, ?)", [
      dejaVuIds.join(","),
      dejaVuIds[dejaVuIds.length - 1] || 0,
      req.session.user?.id || 0,
    ]);
    res.json(posts[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
