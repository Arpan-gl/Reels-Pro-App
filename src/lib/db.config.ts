import mongoose from "mongoose";

const MongoDb_Uri = process.env.MONGODB_URI!;

if(!MongoDb_Uri){
    throw new Error("MongoDb URI is not provided");
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnection(){
    if(cached.conn){
        return cached.conn;
    }
    if(!cached.promise){
        const opts = {
            bufferCommands : true,  // Enable command buffering.
            maxPoolSize : 10,  //Maximum connection in connnection in one time/request.
        } 
        cached.promise = mongoose.connect(MongoDb_Uri,opts).then(()=>mongoose.connection)
    }
    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw new Error("Error connecting to database");
    }

    return cached.conn;
}