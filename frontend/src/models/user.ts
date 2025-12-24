import { useUserStore } from "../stores/userStores";
import userService from "../service/userService";

export class User {
  private id: number;
  private username: string;
  private email: string;
  private img: string;
  private nbFollow: number;
  private nbFollower: number;
  private nbPost: number;
  private isUserConnected: boolean;
  private follow: boolean;

  constructor(
    id: number,
    username: string,
    email: string,
    img: string,
    nbFollow?: number,
    nbFollower?: number,
    nbPost?: number,
    follow?: boolean
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.img = img;
    this.nbFollow = nbFollow || 0;
    this.nbFollower = nbFollower || 0;
    this.nbPost = nbPost || 0;
    this.follow = follow || false;
    this.isUserConnected = this.id === useUserStore().user?.getId();
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
  getNbFollow(): number {
    return this.nbFollow;
  }
  getNbFollower(): number {
    return this.nbFollower;
  }
  getNbPost(): number {
    return this.nbPost;
  }
  getFollow(): boolean {
    return this.follow;
  }
  getisUserConnected(): boolean {
    return this.isUserConnected;
  }

  async followUser() {
    const res = await userService.followUser(this.id);
    if (res.follow === 1) {
      this.follow = !this.follow;
      this.nbFollower++;
    } else if (res.follow === 0) {
      this.follow = !this.follow;
      this.nbFollower--;
    }
  }
}
