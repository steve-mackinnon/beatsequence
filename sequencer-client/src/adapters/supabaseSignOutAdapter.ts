import { SignOut } from "../ports/signOut";
import { supabase } from "../supabase";

export class FirebaseSignOutAdapter implements SignOut {
  async signOut(): Promise<boolean> {
    try {
      const { error } = await supabase.auth.signOut();
      return error == null;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
