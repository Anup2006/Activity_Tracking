import mongoose,{Schema} from 'mongoose';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";    

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    avatar:{
        type:String,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // allows null for email users
    },
    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    fullname:{
        type:String,
        default:"-",
        // required:true,
        trim:true,
        index:true
    },
    password:{
        type:String,
        required: function () {
            return this.provider === "local";
        },
    },
    avatar:{
        type:String,
    },
    refreshToken:{
        type:String,
    },
    isEmailVerified: {
        type: Boolean,
    },
    emailOTP: String,
    emailOTPExpires: Date,
    
},{ timestamps: true });

userSchema.pre("save", async function (){
    if(!this.isModified("password")) {
        return;
    }

    this.password= await bcrypt.hash(this.password,10);
})

userSchema.methods.isPasswordCorrect=async function (password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken= function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken= function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User',userSchema);