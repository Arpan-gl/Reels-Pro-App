import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnection } from "./db.config";
import User from "@/models/User.models";
import bcrypt from "bcryptjs";

export const authOptions : NextAuthOptions = {
    providers : [
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                email : {label:"Email",type:"text"},
                password: {label:"Password",type:"password"},
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password){
                    throw new Error("All fields are required");
                }

                try {
                    await dbConnection();
                    const user = await User.findOne({email: credentials.email});
                    if(!user){
                        throw new Error("User not found");
                    }
                    const isMatch = await bcrypt.compare(
                        credentials.password as string, 
                        user.password
                    );
                    if(!isMatch){
                        throw new Error("Invalid Password");
                    }
                    return {
                        id:user._id.toString(),
                        email:user.email,
                    }
                } catch (error:any) {
                    throw new Error(error.message);
                }
            }
        })
    ],
    callbacks:{
        async jwt({token,user}:any){
            if(user){
                token.id = user.id;
            }
            return token;
        },
        async session({session,token}:any){
            if(session.user){
                session.user.id = token.id as string;
            }
            return session;
        }
    },
    pages:{
        signIn:"/login",
        error:"/login"
    },
    session:{
        strategy:"jwt",
        maxAge:30 * 24 * 60 * 60
    },
    secret:process.env.NEXTAUTH_SECRET,
}