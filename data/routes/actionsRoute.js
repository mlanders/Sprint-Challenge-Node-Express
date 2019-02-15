const express = require('express');
const actionsdb = require('../helpers/actionModel');
const router = express.Router();

//CREATE

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
