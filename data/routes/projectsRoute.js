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
			error: 'The project information could not be saved.',
		});
	}
});
//READ

router.get('/', async (req, res) => {
	try {
		const { id } = req.query;
		const projects = await projectsdb.get(id);
		res.status(200).json({ success: true, projects });
	} catch (error) {
		res.status(500).json({
			error: 'The project information could not be retrieved.',
		});
	}
});

//READ

router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const project = await projectsdb.get(id);
		if (project) {
			res.status(200).json({ success: true, project });
		} else {
			res.status(404).json({ success: true, project });
		}
	} catch (error) {
		res.status(500).json({
			error: 'Unable to find a project with that ID.',
		});
	}
});

//UPDATE

router.put('/:id', async (req, res) => {
	try {
		const { name, description, completed } = req.body;
		const { id } = req.params;
		const changes = { name, description, completed };
		const project = await projectsdb.get(id);
		if (project) {
			const updatedProject = await projectsdb.update(id, changes);
			res.status(200).json({ success: true, updatedProject });
		} else {
		}
	} catch (error) {
		res.status(404).json({
			error: "The project couldn't be found.",
		});
	}
});

//DESTROY

router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const project = await projectsdb.get(id);
		console.log(project);
		const deleted = await projectsdb.remove(id);

		res.status(200).json({ success: true, message: 'Successfully deleted the project' });
	} catch (error) {
		res.status(500).json({
			error: 'The project could not be deleted.',
			error,
		});
	}
});

module.exports = router;
