import { User } from "../entities/user";

export interface SignIn {
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<User | undefined>;
}
