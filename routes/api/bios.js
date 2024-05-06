const express = require('express');
const router = express.Router();
const bioController = require('../../controllers/bioController');
const app = express();
//const ROLES_LIST = require('../../config/roles_list');
//const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(bioController.getAllBios)
    .post(bioController.createNewBio);

router.route('/find')
    .post(bioController.getBio);

router.route('/getClient')
    .post(bioController.getClient);

router.route('/updateBio')
    .put(bioController.updateBio);

router.route('/updateAccount')
    .patch(bioController.updateAccount);  

router.route('/updatePlan')
    .patch(bioController.updatePlan)

module.exports = router;