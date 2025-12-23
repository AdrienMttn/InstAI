export class Comment {
  private username: string;
  private profile_picture: string;
  private message: string;

  constructor(username: string, profile_picture: string, message: string) {
    this.username = username;
    this.profile_picture = profile_picture;
    this.message = message;
  }

  getUsername(): string {
    return this.username;
  }
  getProfile_picture(): string {
    return this.profile_picture;
  }
  getMessage(): string {
    return this.message;
  }
}
