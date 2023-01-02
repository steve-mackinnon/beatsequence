import { User } from "../entities/user";

export interface CreateUser {
  createUserWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<User | undefined>;
}
