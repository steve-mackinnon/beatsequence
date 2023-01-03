import { CreateUser } from "../ports/createUser";
import { User } from "../entities/user";
import { supabase } from "../supabase";

export class SupabseCreateUserAdapter implements CreateUser {
  async createUserWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<User | undefined> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error != null) {
        console.log(error);
        return undefined;
      }
      return {
        id: data?.user?.id ?? "",
        email: data?.user?.email ?? undefined,
      };
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }
}
