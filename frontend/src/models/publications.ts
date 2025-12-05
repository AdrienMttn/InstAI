export class Publication {
  private id: number;
  private image_url: string;
  private username: string;
  private profile_picture: string;
  private nbLike: number;
  private nbComment: number;

  constructor(
    id: number,
    image_url: string,
    username: string,
    profile_picture: string,
    nbLike: number,
    nbComment: number
  ) {
    this.id = id;
    this.image_url = image_url;
    this.username = username;
    this.profile_picture = profile_picture;
    this.nbLike = nbLike;
    this.nbComment = nbComment;
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
}
