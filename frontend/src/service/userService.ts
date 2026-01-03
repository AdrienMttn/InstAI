export default class userService {
  static async create(username: string) {
    try {
      const res = await fetch("/api/create-account", {
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
      const data = await res.json();
      if (res.status === 401) {
        return { status: res.status, error: data.error };
      }
      return data;
    } catch (error: any) {
      return { error: error.message };
    }
  }

  static async commentPublication(postId: number, message: string) {
    try {
      const res = await fetch("/api/comment-publication", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: postId,
          commentText: message,
        }),
      });
      return res.json();
    } catch (error: any) {
      return { error: error.message };
    }
  }

  static async exploreUsers() {
    try {
      const res = await fetch("/api/explore-users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await res.json();
    } catch (error: any) {
      return { error: error.message };
    }
  }

  static async searchUsers(username: string) {
    try {
      const res = await fetch("/api/search-users", {
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

  static async followUser(userId: number) {
    try {
      const res = await fetch("/api/follow-unfollow-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
        }),
      });
      return await res.json();
    } catch (error: any) {
      return { error: error.message };
    }
  }

  static async getFollowers(username: string) {
    try {
      const res = await fetch("/api/get-followers", {
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

  static async getFollowed(username: string) {
    try {
      const res = await fetch("/api/get-followed", {
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
}
