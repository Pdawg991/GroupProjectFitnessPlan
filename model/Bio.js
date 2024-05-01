const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bioSchema = new Schema({
    fitness_goal: {
        type: String,
        required: true
    },
    current_weight: {
        type: Number,
        required: true
    },
    goal_weight: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    }, 
    gender: {
        type: String,
        enum: ['m', 'f'],
        required: true
    },
    fitness_level: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const personalInfoSchema = new Schema({
    age: {
        type: Number,
        required: true
    },
    current_weight: {
        type: Number,
        required: true
    },
    current_height: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['m', 'f'],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    goal_weight: {
        type: Number,
        required: true
    },
    level: {
        type: Number,
        required: true
    }
});
const usernamePasswordSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required : true
    },
    clientName:{
        type:String,
        required: true
    },
    clientAge: {
        type: Number,
        required: true
    },
    roles: {
        User:{
        type: Number,
        default: 2001
    },
        Editor:Number,
        Admin:Number
    },
    refreshToken: String
});

const UsernamePassword = mongoose.model('UsernamePassword', usernamePasswordSchema);
const Bio = mongoose.model('Bio', bioSchema);
const PersonalInfo = mongoose.model('PersonalInfo', personalInfoSchema);

module.exports = { Bio, PersonalInfo, UsernamePassword};
