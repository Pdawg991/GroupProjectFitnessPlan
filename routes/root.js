const express = require('express');
const router = express.Router();
const path = require('path');
const app = express();
/*router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});
router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});*/
router.get('^/$|/fitnessTest(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'fitnessTest.html'));
});
router.get('^/$|/postFitGoal(.js)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'scripts', 'postFitGoal.js'));
});
router.get('^/$|/fitTest(.css)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'fitTest.css'));
});

router.get('^/$|/information(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'information.html'));
});
router.get('^/$|/information(.css)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'information.css'));
});
router.get('^/$|/login(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
});
router.get('^/$|/login(.css)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.css'));
});
router.get('^/$|/login(.js)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.js'));
});
router.get('^/$|/register(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'register.html'));
});
router.get('^/$|/register(.css)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'register.css'));
});
module.exports = router;