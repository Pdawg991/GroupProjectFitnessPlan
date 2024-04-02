const express = require('express');
const router = express.Router();
const path = require('path');
const app = express();

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});
router.get('^/$|/fitnessTest(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'fitnessTest.html'));
});
module.exports = router;