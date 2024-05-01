require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/dbConn');
const verifyJWT = require('./middleware/verifyJWT');
const PORT = process.env.PORT  || 3000 || 5500;
const credentials = require('./middleware/credentials')
// Connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);


app.use(credentials);
// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

app.use(cookieParser());
//Serve static files from public
app.use(express.static(path.join(__dirname, 'public')));
// routes
app.use('/', require('./routes/root'));
app.use('/auth', require('./routes/api/auth'));
app.use('/refresh', require('./routes/api/refresh'));
app.use('/logout', require('./routes/api/logout'));
app.use('/register', require('./routes/api/register'));

app.use(verifyJWT);

app.use('/bio', require('./routes/api/bios'));


app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});