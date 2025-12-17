import userService from "../service/userService";

export class Publication {
  private id: number;
  private image_url: string;
  private username: string;
  private profile_picture: string;
  private nbLike: number;
  private nbComment: number;
  private hasLiked: boolean;

  constructor(
    id: number,
    image_url: string,
    username: string,
    profile_picture: string,
    nbLike: number,
    nbComment: number,
    hasLiked: boolean
  ) {
    this.id = id;
    this.image_url = image_url;
    this.username = username;
    this.profile_picture = profile_picture;
    this.nbLike = nbLike;
    this.nbComment = nbComment;
    this.hasLiked = hasLiked;
  }

  getId(): number {
    return this.id;
  }
  getImage_url(): string {
    return this.image_url;
  }
  getUsername(): string {
    return this.username;
  }
  getProfile_picture(): string {
    return this.profile_picture;
  }
  getNbLike(): number {
    return this.nbLike;
  }
  getNbComment(): number {
    return this.nbComment;
  }
  getHasLiked(): boolean {
    return this.hasLiked;
  }

  async addOrRemoveLike() {
    const res = await userService.likePublication(this.id);
    if (res?.error) {
      if (res.status === 401) {
        console.log(res);
      }
    } else {
      this.hasLiked = !this.hasLiked;
      if (res?.liked == 1) {
        this.nbLike += 1;
      } else {
        this.nbLike -= 1;
      }
    }
  }
}
