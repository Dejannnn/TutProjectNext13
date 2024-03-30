import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
//Monggo Schema
import User from "@models/user";
import { connectToDB } from '@utils/database';
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET_ID
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({ email: session.user.email });
            session.user.id = sessionUser._id.toString();

            return session;
        },
        async signIn({ profile }) {
            const { email, name: username, picture: image } = profile;
            try {
                await connectToDB();
                const userExist = await User.findOne({ email });

                if (!userExist) {
                    await User.create({ email, username, image });
                }
                return true
            } catch (error) {
                console.log(error);
                return false
            }
        }
    }
})

export { handler as GET, handler as POST };
