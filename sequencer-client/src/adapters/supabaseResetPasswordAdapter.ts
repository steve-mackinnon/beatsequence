import { ResetPassword } from "../ports/resetPassword";
import { supabase } from "../supabase";

export class FirebaseResetPasswordAdapter implements ResetPassword {
  async sendPasswordResetEmail(email: string): Promise<boolean> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      return error == null;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
