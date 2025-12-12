export default class userService {
  static async login(email: string | unknown, password: string | unknown) {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      const data = await res.json();
      if (res.status === 401) {
        return data;
      }
      return data;
    } catch (error: any) {
      return { error: error.message };
    }
  }

  static async create(username: string, email: string, password: string) {
    try {
      const res = await fetch("/api/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });
      return await res.json();
    } catch (error: any) {
      return { error: error.message };
    }
  }

  static async me() {
    try {
      const res = await fetch("/api/session-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await res.json();
    } catch (error: any) {
      return { error: error.message };
    }
  }

  static async user(username: any) {
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
        }),
      });
      return await res.json();
    } catch (error: any) {
      return { error: error.message };
    }
  }

  static async generate(prompt: string) {
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      });
      return await res.json();
    } catch (error: any) {
      return { error: error.message };
    }
  }

  static async postPublication() {
    try {
      const res = await fetch("/api/post-publication", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await res.json();
    } catch (error: any) {
      return { error: error.message };
    }
  }

  static async likePublication(postId: number): Promise<any> {
    try {
      const res = await fetch("/api/like-dislike-publication", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: postId,
        }),
      });
      return await res.json();
    } catch (error: any) {
      return { error: error.message };
    }
  }
}
