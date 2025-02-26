import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
    _id?:mongoose.Types.ObjectId,
    email:string,
    username:string,
    password:string,
    createdAt?:Date,
    updatedAt?:Date
}

const userSchema = new mongoose.Schema<IUser>({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate:{
            validator: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: "Invalid email format"
        },
    },
    password:{
        type:String,
        required:true,
        minlength:5
    }
},{timestamps: true});

const User = mongoose.models.User || mongoose.model<IUser>("User",userSchema);

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

export default User;