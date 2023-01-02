import { Auth, signOut } from "firebase/auth";
import { SignOut } from "../ports/signOut";

export class FirebaseSignOutAdapter implements SignOut {
  private readonly _auth: Auth;

  constructor(auth: Auth) {
    this._auth = auth;
  }

  async signOut(): Promise<boolean> {
    try {
      await signOut(this._auth);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
