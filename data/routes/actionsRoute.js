const express = require('express');
const actionsdb = require('../helpers/actionModel');
const router = express.Router();

//CREATE

router.post('/', async (req, res) => {
	try {
		const { project_id, description, notes, completed } = req.body;
		const newAction = { project_id, description, notes, completed };
		const action = await actionsdb.insert(newAction);
		res.status(201).json({ success: true, action });
	} catch {
		res.status(500).json({
			error: 'The posts information could not be retrieved.',
		});
	}
});

//READ
router.get('/', async (req, res) => {
	try {
		const actions = await actionsdb.get();
		res.status(200).json({ success: true, actions });
	} catch (error) {
		res.status(500).json({
			error: 'The action could not be retrieved.',
		});
	}
});

//UPDATE

router.put('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { project_id, description, notes, completed } = req.body;
		const changes = { project_id, description, notes, completed };
		const updated = await actionsdb.update(id, changes);
		res.status(200).json({ success: true, updated });
	} catch (error) {
		res.status(500).json({
			error: "The action could't be updated.",
		});
	}
});

//DESTROY

router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const updated = await actionsdb.remove(id);
		res.status(200).json({ success: true, updated });
	} catch (error) {
		res.status(500).json({
			error: "The action couldn't me removed.",
		});
	}
});

module.exports = router;
