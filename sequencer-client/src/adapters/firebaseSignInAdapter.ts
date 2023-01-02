import { SignIn } from "../ports/signIn";
import { User } from "../entities/user";
import { signInWithEmailAndPassword, Auth } from "firebase/auth";

export class FirebaseSignInAdapter implements SignIn {
  private readonly _auth: Auth;

  constructor(auth: Auth) {
    this._auth = auth;
  }

  async signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<User | undefined> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this._auth,
        email,
        password
      );
      return {
        id: userCredential.user.uid,
        email: userCredential.user.email ?? undefined,
      };
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
}
