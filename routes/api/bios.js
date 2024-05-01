const express = require('express');
const router = express.Router();
const bioController = require('../../controllers/bioController');
const app = express();
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(bioController.getAllBios)
    .post(verifyRoles(ROLES_LIST.User), bioController.createNewBio);

router.route('/find')
    .post(bioController.getBio);
router.route('/getClient')
    .post(bioController.getClient);

router.route('/createPi')
    .post(bioController.createNewPi);

router.route('/updateBio')
    .put(bioController.updateBio);

router.route('/updateAccount')
    .patch(bioController.updateAccount);    

module.exports = router;