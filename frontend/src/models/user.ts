export class User {
  private id: number;
  private username: string;
  private email: string;
  private img: string;

  constructor(id: number, username: string, email: string, img: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.img = img;
  }

  getId(): number {
    return this.id;
  }

  getUsername() {
    return this.username;
  }

  getEmail() {
    return this.email;
  }

  getImg(): string {
    return this.img;
  }
}
