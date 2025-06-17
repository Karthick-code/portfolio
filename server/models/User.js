const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
        },
    ],
    linkedIn: {
        type: String,
    },
    github: {
        type: String,
    },
    skills:{
        techskills:[{
            type: String,
        }],
        lifeSkills: [{
            type: String,
        }]
    },
    
    bio: {
        type: String,
    },
    profilePicture: {
        type: String,
    },
    education: [
        {
            degree: {
                type: String,
                required: true,
            },
            institute: {
                type: String,
                required: true,
            },
            percentage: {
                type: String,
                required: true,
            },
            year: {
                type: String,
                required: true,
            }
        }
    ],
    hobbies: [
        {
            type: String,
        }
    ]

});
const User = mongoose.model('User', userSchema);
module.exports = User;