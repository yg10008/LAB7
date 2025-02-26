const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true,
        minLength:4,
        unique:true,  
        maxLength:50,   
    },
    lastName : {
        type : String,
        minLength:4,
        maxLength:50, 
    },
    emailId : {
        type : String,
        required: true,
        trim:true,
        lowercase:true,
        unique:true,  
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        validate(value) {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(value)) {
                throw new Error("EMAIL_IS_NOT_VALID");
            }
        }
    },
    password : {
        type : String,
        required: true,
        minLength:8,
    },
    skills : {
        type : [String],
        validate(value){
            if(value.length > 5){
                throw new Error("ONLY_FIVE_SKILLS_ALLOWED");
            }
        }
    }
},
{
    timestamps: true,
});

userSchema.methods.getJWT = async function(){

    const user = this; 
    const token = await jwt.sign({_id:user._id},"DEV@tinder$123");

    return token;
}

userSchema.methods.getPasswordAuthentication = async function(passwordInputByUserInstance){
    const user = this;
    const passwordHash = user.password;
    const check =  await bcrypt.compare(passwordInputByUserInstance,passwordHash);

    return check;
}

const User =  mongoose.model("User",userSchema);

module.exports = {
    User,
}