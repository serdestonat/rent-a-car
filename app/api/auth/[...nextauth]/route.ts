import NextAuth from "next-auth/next";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { Session, User as NextAuthUser } from "next-auth";

const handler = NextAuth({
  callbacks: {
    async session({ session }: { session: Session }) {
      return session;
    },

    async signIn({ profile }: { profile: NextAuthUser }) {
      try {
        await connectToDB();

        // Kullanıcıyı veritabanında ara
        const existingUser = await User.findOne({ email: profile.email });

        // Eğer kullanıcı yoksa, yeni bir kullanıcı oluştur
        if (!existingUser) {
          await User.create({
            name: profile.name,
            email: profile.email,
          });
        }
        return true;
      } catch (e) {
        console.error("google sign-in error:", e);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
