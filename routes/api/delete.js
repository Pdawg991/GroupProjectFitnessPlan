const express = require('express');
const router = express.Router();
const deleteController = require('../../controllers/deleteController');

router.route('/')
    .delete(deleteController.handleDelete);

    module.exports = router;