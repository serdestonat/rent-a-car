"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth"; // Session tipini import ediyoruz

interface AuthProviderProps {
  children: React.ReactNode;
  session: Session | null; // session prop'unun tipini belirliyoruz
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children, session }) => {
  return (
    <div>
      <SessionProvider session={session}>{children}</SessionProvider>
    </div>
  );
};

export default AuthProvider;
