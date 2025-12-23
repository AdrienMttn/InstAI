import connection from "../config/bd.js";

export async function feed(req, res) {
  try {
    const { dejaVuIds } = req.body;
    const [posts] = await connection.execute("call GetFeed(?, ?, ?)", [
      dejaVuIds.join(","),
      dejaVuIds[dejaVuIds.length - 1] || 0,
      req.session.user?.id || 0,
    ]);
    const data = posts[0].map((post) => ({
      id: post.id,
      image_url: post.image_url,
      username: post.username,
      profile_picture: post.profile_picture,
      nbLike: post.nbLike,
      nbComment: post.nbComment,
      hasLiked: post.hasLiked,
      comment: [],
    }));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getPost(req, res) {
  try {
    const { postId } = req.body;
    const post = await connection.execute("call GetPost(?,?)", [
      postId,
      req.session.user?.id || 0,
    ]);
    const comment = await connection.execute("call GetComment(?)", [postId]);
    const data = post[0][0].map((publication) => ({
      id: publication.id,
      image_url: publication.image_url,
      username: publication.username,
      profile_picture: publication.profile_picture,
      nbLike: publication.nbLike,
      nbComment: publication.nbComment,
      hasLiked: publication.hasLiked,
      comments: comment[0][0],
    }));
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
