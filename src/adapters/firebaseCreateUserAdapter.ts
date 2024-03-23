import { CreateUser } from "../ports/createUser";
import { User } from "../entities/user";
import { createUserWithEmailAndPassword, Auth } from "firebase/auth";

export class FirebaseCreateUserAdapter implements CreateUser {
  private readonly _auth: Auth;
  constructor(auth: Auth) {
    this._auth = auth;
  }

  async createUserWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<User | undefined> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this._auth,
        email,
        password
      );
      return {
        id: userCredential.user.uid,
        email: userCredential.user.email ?? undefined,
      };
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }
}
