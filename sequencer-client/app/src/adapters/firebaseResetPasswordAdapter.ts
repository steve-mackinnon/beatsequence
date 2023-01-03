import { ResetPassword } from "../ports/resetPassword";
import { Auth, sendPasswordResetEmail } from "firebase/auth";

export class FirebaseResetPasswordAdapter implements ResetPassword {
  private readonly _auth: Auth;
  constructor(auth: Auth) {
    this._auth = auth;
  }

  async sendPasswordResetEmail(email: string): Promise<boolean> {
    try {
      await sendPasswordResetEmail(this._auth, email);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
