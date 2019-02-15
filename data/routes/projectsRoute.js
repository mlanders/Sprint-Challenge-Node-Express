const express = require('express');
const projectsdb = require('../helpers/projectModel');
const router = express.Router();

//CREATE
router.post('/', async (req, res) => {
	try {
		const { name, description, completed } = req.body;
		const newProject = { name, description, completed };
		const project = await projectsdb.insert(newProject);
		res.status(201).json({ success: true, project });
	} catch {
		res.status(500).json({
			error: 'The posts information could not be retrieved.',
		});
	}
});
//READ

router.get('/', async (req, res) => {
	try {
		const projects = await projectsdb.get();
		res.status(200).json({ success: true, projects });
	} catch (error) {
		res.status(500).json({
			error: 'The posts information could not be retrieved.',
		});
	}
});

//UPDATE

//DESTROY

module.exports = router;
