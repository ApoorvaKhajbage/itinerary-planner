import mongoose from 'mongoose';
import {Schema,model,models} from 'mongoose';

const userSchema = new Schema(
    {
        
        username:{
            type : String,
            unique : true,
            required : true,

        },
        email:{
            type : String,
            unique : true,
            required : true,
        },
        password:{
            type : String,
            unique : true,
            required : false,
        }
    },
    {timestamps: true}
)
const Users = models.user || model('user',userSchema);

export default Users;