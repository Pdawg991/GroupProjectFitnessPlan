const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bioSchema = new Schema({
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
    exercises: {
        type: Array,
        required: false,
        default: []
    },
    diet: {
        type: Array,
        required: false,
        default: []
    },
    caloricIntake:{
        type: Number,
        required: false,
        default: 0
    },
    notes:{
        type: String,
        required: false,
        default: ""
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
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

module.exports = { Bio, UsernamePassword};
