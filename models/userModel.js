import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        maxLength : 25
    },
    email : {
        type : String,
        required : true,
        unique : true,
        maxLength: 30
    },
    hashPassword : {
        type : String,
        required : true,
        minLength : 6
    },
    isAdmin : {
        type : Boolean,
        default :false
    }
},
{ timestamps : true} 
);

const User = mongoose.model("User", userSchema);

export default User