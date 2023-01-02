export interface ResetPassword {
  sendPasswordResetEmail: (email: string) => Promise<boolean>;
}
