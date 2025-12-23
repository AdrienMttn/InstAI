import { Publication } from "../models/publications";
export default class publicationService {
  static async getFeed(listId: number[]): Promise<Publication[] | any> {
    try {
      const response = await fetch("/api/feed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dejaVuIds: listId }),
      });
      return await response.json();
    } catch (error: any) {
      return error;
    }
  }

  static async getPublication(postId: number) {
    try {
      const response = await fetch("/api/get-publication", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: postId }),
      });
      return await response.json();
    } catch (error: any) {
      return error;
    }
  }
}
