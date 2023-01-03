import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
if (supabaseUrl === undefined) {
  throw new Error("SUPABASE_URL is not defined");
}
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
if (supabaseAnonKey === undefined) {
  throw new Error("SUPABASE_ANON_KEY is not defined");
}
// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
