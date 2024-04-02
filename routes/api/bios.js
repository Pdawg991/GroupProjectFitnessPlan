const express = require('express');
const router = express.Router();
const bioController = require('../../controllers/bioController');

router.route('/')
    .get(bioController.getBio)
    .post(bioController.createNewBio);

module.exports = router;