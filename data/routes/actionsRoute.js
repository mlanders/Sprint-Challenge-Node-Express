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
			error: 'The posts information could not be retrieved.',
		});
	}
});

//UPDATE

//DESTROY

module.exports = router;
