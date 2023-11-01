import NextAuth from "next-auth";
import {PrismaAdapter}  from "@next-auth/prisma-adapter";
import client from "../../../libs/prismadb";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";


export const authOptions = {
  adapter: PrismaAdapter(client),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        userid: { label: "Username", type: "text", placeholder: "goyalk130" },
        pass: { label: "Password", type: "password", placeholder: "password" },
        usertype: { label: "User Type", type: "select", placeholder: "Admin" },
      },
      async authorize(credentials) {
        // check if getting all fields or not
        if (!credentials.userid || !credentials.pass || !credentials.usertype) {
          throw new Error("please enter userid pass and acoount type");
        }
        let user = {};
        if (credentials.usertype == "admin") {
          user = await client.admin.findUnique({
            where: { userId: credentials.userid },
          });
        } else if (credentials.usertype == "faculty") {
          user = await client.faculty.findUnique({
            where: { userId: credentials.userid },
          });
        }

        if (!user || !user?.password) {
          throw new Error("NO user found");
        }

        const matchpassword = await bcrypt.compare(
          credentials.pass,
          user.password
        );

        if (!matchpassword) {
          throw new Error("Incoreect password");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async session({session , token}){
      session.user = token
      return session
    },
    async jwt({ token, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if(user){
        token
        token.id= user.id
        token.name= user.name
        token.role= user.role
      }
      return token
    }
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
