import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { Account, User as AuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"; // Import CredentialsProvider
import bcrypt from "bcryptjs";
import User from "@/models/users";
import connect from "@/utils/db";

export const authOptions: any = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any) {
                await connect();
                try {
                    const user = await User.findOne({ email: credentials.email });
                    if (user) {
                        const isPasswordValid = await bcrypt.compare(
                            credentials.password,
                            user.password
                        );
                        if (isPasswordValid) {
                            return user;
                        }
                    }
                } catch (error: any) {
                    throw new Error("An error occurred while signing in");
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    secret: process.env.SECRET,
};
export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

