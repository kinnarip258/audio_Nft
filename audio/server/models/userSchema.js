//========================== Load Modules Start ===========================

//========================== Load internal Module =========================

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//========================== Load Modules End =============================

//============================= Model Schema Of User =============================

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    bio: {
        type: String,
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    genres: [
        {
            type: String,
            required: true
        }
    ],
    NFT: [
        {
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            coverImage: {
                type: String,
                required: true
            },
            audioFile: {
                type: String,
                required: true
            },
            price: {
                type: String,
                required: true
            },
            createAt:{
                type: Date,
                default: Date.now
            },
        }
    ],
    Tokens: [
        {
            token: {
                type: String,
                required: true  
            }
        }
    ],
    createAt:{
        type: Date,
        default: Date.now
    },
});

//============================= Hashing Password =============================
userSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

//============================= Generate Token =============================
userSchema.methods.generateAuthToken = async function() {
    try{
        //============================= Generate Token =============================
        let token = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
        //============================= Concat Token With Tokens =============================
        this.Tokens = this.Tokens.concat({token});
        //============================= Save Token =============================  
        await this.save();
        return token;
    }
    catch (err) {
        //============================= Error Response =============================
        console.log(err);
    }
}

//============================= User Model =============================
const User = mongoose.model('User', userSchema);

//========================== Export Module Start ===========================

module.exports = User;

//========================== Export module end ==================================