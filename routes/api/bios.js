const express = require('express');
const router = express.Router();
const bioController = require('../../controllers/bioController');
const app = express();

router.route('/')
    .get(bioController.getAllBios)
    .post(bioController.createNewBio);

router.route('/find')
    .get(bioController.getBio)

module.exports = router;