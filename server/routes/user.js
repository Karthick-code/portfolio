const users = require('../models/User');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const user = await users.find();
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const user = await users.findById(req.params.id);
        if (!user) return res.status(404).send('User not found');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
);
router.post('/', async (req, res) => {
    const user = new users({
        name: req.body.name,
        email: req.body.email,
        projects: req.body.projects,
        linkedIn: req.body.linkedIn,
        github: req.body.github,
        skills: req.body.skills,
        skills_technology: req.body.skills_technology,
        hobbies: req.body.hobbies,
        profilePicture: req.body.profilePicture,
        education: req.body.education,
        hobbies: req.body.hobbies,
        about: req.body.about
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
);

router.put('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;

        const updatedUser = await users.findByIdAndUpdate(userId, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
);
router.delete('/:id', async (req, res) => {
    try {
        const user = await users.findById(req.params.id);
        if (!user) return res.status(404).send('User not found');
        await user.remove();
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
);
module.exports = router;


