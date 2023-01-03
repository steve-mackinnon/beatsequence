import { SignIn } from "../ports/signIn";
import { User } from "../entities/user";
import { supabase } from "../supabase";

export class FirebaseSignInAdapter implements SignIn {
  async signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<User | undefined> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error != null) {
        console.log(error);
        return undefined;
      }
      return {
        id: data.user?.id ?? "",
        email,
      };
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
}
