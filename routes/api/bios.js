const express = require('express');
const router = express.Router();
const bioController = require('../../controllers/bioController');
const app = express();

router.route('/')
    .get(bioController.getBio)
    .post(bioController.createNewBio);

module.exports = router;