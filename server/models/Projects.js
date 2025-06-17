const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    technologies: [String],
    githubLink: {
        type: String,
        required: true,
    },
    liveLink: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });
const Project = mongoose.model('Project', projectSchema);
module.exports = Project;