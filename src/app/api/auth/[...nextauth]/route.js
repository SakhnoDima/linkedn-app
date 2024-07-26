import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import User from "@/app/lib/user-model";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          return null;
        }

        const isPasswordCorrect = await compare(
          credentials.password || " ",
          user.password
        );

        if (isPasswordCorrect) {
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (trigger === "update" && session.isLinkedinAuth) {
        token.isLinkedinAuth = session.isLinkedinAuth;
      }
      if (user) {
        return {
          ...token,
          id: user._id,
          isLinkedinAuth: user.isLinkedinAuth,
          isUpWorkAuth: user.isUpWorkAuth,
        };
      }

      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          id: token.id,
          isLinkedinAuth: token.isLinkedinAuth,
          isUpWorkAuth: token.isUpWorkAuth,
        },
      };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
