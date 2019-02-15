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
		const projectActions = await projectsdb.getProjectActions(id);
		res.status(200).json({ success: true, projectActions });
	} catch (error) {
		res.status(500).json({
			error: 'The project information could not be retrieved.',
		});
	}
});

//UPDATE

router.put('/:id', async (req, res) => {
	try {
		const { name, description, completed } = req.body;
		const { id } = req.params;
		const changes = { name, description, completed };
		const updatedProject = await projectsdb.update(id, changes);
		res.status(200).json({ success: true, updatedProject });
	} catch (error) {
		res.status(500).json({
			error: 'The project information could not be updated.',
		});
	}
});

//DESTROY

router.delete('/:id', async (res, req) => {
	try {
		const { id } = req.params;
		const deleted = await projectsdb.remove(id);

		res.status(200).json({ success: true, message: 'Successfully deleted the project' });
	} catch (error) {
		res.status(500).json({
			error: 'The project could not be deleted.',
		});
	}
});

module.exports = router;
