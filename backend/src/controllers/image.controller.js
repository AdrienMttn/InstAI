import dotenv from "dotenv";
dotenv.config();

// Générer une image avec pollinations.ai
export async function generateImage(req, res) {
  try {
    if (req.session.user === undefined) {
      const error = new Error("User is not connected");
      error.status = 401;
      throw error;
    }
    const { prompt } = req.body;
    const imgUrl = await fetch(
      `https://gen.pollinations.ai/api/generate/image/${encodeURI(
        prompt
      )}?model=zimage&width=1024&height=1024&quality=hd&seed=-1`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${process.env.POLLINATION_API_KEY}` },
      }
    );
    if (imgUrl.status === 500) {
      const error = new Error("Image generation failed");
      error.status = 400;
      throw error;
    }
    const buffer = Buffer.from(await imgUrl.arrayBuffer());
    req.session.generateImage = buffer.toString("base64");
    res.send({ image: buffer.toString("base64") });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
}

// prompt bug : shrek qui mange plein de bonbon

// poster l'image générer sur postimg.cc
export async function postOnPostimg(file) {
  try {
    const form = new FormData();
    form.append("optsize", "0");
    form.append("expire", "0");
    form.append("numfiles", "1");
    form.append("upload_session", "1764620882670.7666386589446694");
    form.append("file", file);
    const response = await fetch("https://postimg.cc/json?q=a", {
      method: "POST",
      body: form,
    });
    const data = await response.json();
    return await getOgUrl(data.url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

// Permet de récupérer uniquement l'url de l'image
async function getOgUrl(pageUrl) {
  const response = await fetch(pageUrl, {
    method: "GET",
  });
  const html = await response.text();
  const match = html.match(
    /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i
  );
  if (match) {
    return match[1];
  } else {
    throw new Error("Image URL not found in the page");
  }
}
