const express = require('express');
const router = express.Router();
const { createForm, getFormById } = require('../controllers/formController');

router.post('/', createForm);
router.get('/:id', getFormById);

module.exports = router;
