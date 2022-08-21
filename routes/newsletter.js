const express = require('express');
const router = express.Router();
const { ctrlNewsletter } = require('../controllers/index');


// Route :: Newsletter

router.route('/newsletter').post(ctrlNewsletter.postNewsletter);

module.exports = router;