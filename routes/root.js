const express = require('express');
const router = express.Router();
const path = require('path');
const app = express();

router.get('^/$|/fitnessTest(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'fitnessTest.html'));
});
router.get('^/$|/postFitTest(.js)?', (req, res) => {
    if (req.headers.referer && req.headers.referer.includes('fitnessTest.html')) {
        res.sendFile(path.join(__dirname, '..', 'scripts', 'postFitTest.js'));
    } else {
        // If requested directly or from an unauthorized source, return 403 Forbidden
        res.status(403).send('Forbidden');
    }
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
    //res.sendFile(path.join(__dirname, '..', 'scripts', 'login.js'));

    if (req.headers.referer && req.headers.referer.includes('login.html')) {
        res.sendFile(path.join(__dirname, '..', 'scripts', 'login.js'));
    } else {
        // If requested directly or from an unauthorized source, return 403 Forbidden
        res.status(403).send('Forbidden');
    }
});
router.get('^/$|/register(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'register.html'));
});
router.get('^/$|/register(.css)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'register.css'));
});

router.get('^/$|/info(.js)?', (req, res) => {
    if (req.headers.referer && req.headers.referer.includes('information.html')) {
        res.sendFile(path.join(__dirname, '..', 'scripts', 'info.js'));
    } else {
        // If requested directly or from an unauthorized source, return 403 Forbidden
        res.status(403).send('Forbidden');
    }
});

router.get('^/$|/healthAnalytics(.js)?', (req, res) => {
    if (req.headers.referer && req.headers.referer.includes('information.html')) {
        res.sendFile(path.join(__dirname, '..', 'scripts', 'healthAnalytics.js'));
    } else {
        // If requested directly or from an unauthorized source, return 403 Forbidden
        res.status(403).send('Forbidden');
    }
});
router.get('^/$|/updateAccount(.js)?', (req, res) => {
    if (req.headers.referer && req.headers.referer.includes('information.html')) {
        res.sendFile(path.join(__dirname, '..', 'scripts', 'updateAccount.js'));
    } else {
        // If requested directly or from an unauthorized source, return 403 Forbidden
        res.status(403).send('Forbidden');
    }
});
router.get('^/$|/populateInfo(.js)?', (req, res) => {
     if (req.headers.referer && req.headers.referer.includes('information.html')) {
        res.sendFile(path.join(__dirname, '..', 'scripts', 'populateInfo.js'));
    } else {
        // If requested directly or from an unauthorized source, return 403 Forbidden
        res.status(403).send('Forbidden');
    }
});
router.get('^/$|/deleteAccount(.js)?', (req, res) => {
    if (req.headers.referer && req.headers.referer.includes('information.html')) {
       res.sendFile(path.join(__dirname, '..', 'scripts', 'deleteAccount.js'));
   } else {
       // If requested directly or from an unauthorized source, return 403 Forbidden
       res.status(403).send('Forbidden');
   }
});
router.get('^/$|/main(.css)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'main.css'));
});
module.exports = router;