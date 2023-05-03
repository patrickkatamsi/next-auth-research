import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      //@ts-ignore
      async authorize(credentials, req) {
        const { email, password } = credentials;
        const res = await fetch("http://localhost:5000/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          const secret = "Wk3s553Xak8BvuAvDMUBu2pb6T7ikmd/H/Wug1ZGm0Y=";
          const accessToken = user.data;
          const data = jwt.verify(accessToken, secret);
          return { accessToken, ...data };
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, user, token }) {
      if (token.user) {
        Object.assign(session.user, token.user);
      }

      return session;
    },
  },
  pages: {
    signIn: "login",
  },
};

export default NextAuth(authOptions);
