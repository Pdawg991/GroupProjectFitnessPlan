const express = require('express');
const router = express.Router();
const bioController = require('../../controllers/bioController');
const app = express();

router.route('/')
    .get(bioController.getAllBios)
    .post(bioController.createNewBio);

router.route('/find')
    .post(bioController.getBio);

router.route('/createPi')
    .post(bioController.createNewPi);
    
module.exports = router;