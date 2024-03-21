import { Post } from "./Post";

export interface User {
  name: string;
  email: string;
  avatar: string;
  password: string;
  id: string;
  accessToken: string;
  post?: Post[];
}
