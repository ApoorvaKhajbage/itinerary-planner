import {Schema,model,models} from 'mongoose';

const userSchema = new Schema(
    {
        
        username:{
            type : String,
            unique : [true,"Please enter an unique username"],
            required : [true,"Please enter a username"],

        },
        email:{
            type : String,
            unique : true,
            required : [true,"Please enter an email"],
        },
        password:{
            type : String,
            required : [true,"Please enter a password"],
        },
        isVerified:{
            type : Boolean,
            default : false,
        },
        isAdmin:{
            type : Boolean,
            default : false,
        },
        forgotPasswordToken: String,
        forgotPasswordTokenExpiry: Date,
        verifyToken: String,
        verifyTokenExpiry: Date,
    },
    {timestamps: true}
)
const User = models.users || model('users',userSchema);

export default User;