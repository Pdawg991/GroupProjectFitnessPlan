const express = require('express');
const router = express.Router();
const path = require('path');
const app = express();



function checkReferer(req, res, next) {
    const authorizedReferers = ['fitnessTest.html', 'information.html', 'login.html', 'register.html', 'workouts.html', 'diets.html', 'contact.html'];
    if (req.headers.referer && authorizedReferers.some(referer => req.headers.referer.includes(referer))) {
        next();
    } else {
        // If requested from an unauthorized source, return 403 Forbidden
        res.status(403).send('Forbidden');
    }
}

router.get('^/$|/fitnessTest(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'fitnessTest.html'));
});
router.get('^/$|/fitTest(.css)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'fitTest.css'));
});
router.get('^/$|/postFitTest(.js)?', checkReferer, (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'scripts', 'postFitTest.js'));
});

router.get('^/$|/logout.js', checkReferer, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'scripts', 'logout.js'));
});

router.get('^/$|/getWorkouts.js',checkReferer, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'scripts', 'getWorkouts.js'));
});
router.get('^/$|/getDiet.js',checkReferer, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'scripts', 'getDiet.js'));
});
router.get('^/$|/information(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'information.html'));
});

router.get('^/$|/workouts(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'workouts.html'));
});

router.get('^/$|/diets(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'diets.html'));
});
router.get('^/$|/progress(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'progress.html'));
});
router.get('^/$|/contact(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'contact.html'));
});

router.get('^/$|/login(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
});

router.get('^/$|/login(.js)?', checkReferer, (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'scripts', 'login.js'));
});

router.get('^/$|/register(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'register.html'));
});
router.get('^/$|/register(.css)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'register.css'));
});
router.get('^/$|/registerUser(.js)?',checkReferer, (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'scripts', 'registerUser.js'));
});

router.get('^/$|/info(.js)?', checkReferer, (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'scripts', 'info.js'));
});

router.get('^/$|/healthAnalytics(.js)?', checkReferer, (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'scripts', 'healthAnalytics.js'));
});

router.get('^/$|/updateAccount(.js)?',checkReferer, (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'scripts', 'updateAccount.js'));
});

router.get('^/$|/populateInfo(.js)?', checkReferer, (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'scripts', 'populateInfo.js'));
});

router.get('^/$|/deleteAccount(.js)?',checkReferer, (req, res) => {
       res.sendFile(path.join(__dirname, '..', 'scripts', 'deleteAccount.js'));
});

router.get('^/$|/main(.css)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'main.css'));
});

module.exports = router;