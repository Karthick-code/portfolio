const projects = require('../models/Projects');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const allProjects = await projects.find();
        res.status(200).json(allProjects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post('/', async (req, res) => {
    const { title, description, technologies, githubLink, liveLink, userId } = req.body;
    const newProject = new projects({
        title,
        description,
        technologies,
        githubLink,
        liveLink,
        userId
    });
    try {
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
);
router.get('/:id', async (req, res) => {
    try {
        const project = await projects.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const updatedProject = await projects.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const deletedProject = await projects.findByIdAndDelete(req.params.id);
        if (!deletedProject) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json(deletedProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;

