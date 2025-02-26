declare module "Next-Auth" {
    interface Session {
        user:{
            _id:string
        } & DefaultSession["user"];
    }
}