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
      if (trigger === "update" && session.user.isLinkedinAuth === "update") {
        token.isLinkedinAuth = !token.isLinkedinAuth;
      }

      if (trigger === "update" && session.user.isUpWorkAuth === "update") {
        token.isUpWorkAuth = !token.isUpWorkAuth;
      }
      if (
        trigger === "update" &&
        session.user.isTelegramNotifications === "update"
      ) {
        token.isTelegramNotifications = !token.isTelegramNotifications;
      }
      if (trigger === "update" && session.user.isGreetingMessage === "update") {
        token.isGreetingMessage = !token.isGreetingMessage;
      }

      if (user) {
        return {
          ...token,
          id: user._id,
          email: user.email,
          isLinkedinAuth: user.isLinkedinAuth,
          isUpWorkAuth: user.isUpWorkAuth,
          isTelegramNotifications: user.isTelegramNotifications,
          accountStatus: user.status,
          isGreetingMessage: user.isGreetingMessage,
        };
      }

      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          id: token.id,
          email: token.email,
          isLinkedinAuth: token.isLinkedinAuth,
          isUpWorkAuth: token.isUpWorkAuth,
          isTelegramNotifications: token.isTelegramNotifications,
          accountStatus: token.accountStatus,
          isGreetingMessage: token.isGreetingMessage,
        },
      };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
