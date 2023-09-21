const hostname = "localhost";
const port = 3000;

const express = require('express');
const app = express();
const path = require('path');
const mainRoot = path.dirname(require.main.filename);

const UserRouter = require('./routes/user');
const AdminRouter = require('./routes/admin');
const ErrorController = require('./controllers/error');
const ConsoleController = require('./controllers/console');
const mongo_db = require('./data/database');
const User = require('./models/user');

app.set('view engine', 'ejs');
app.set('views', 'views');

const BodyParser = require('body-parser');
app.use(BodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(mainRoot, 'public')));
app.use((req, res, next) => {
    User.fetchById('650c9c10fd0228ab8d75aec9', (user) => {
        req.user = user;
        next();
    });
});
app.use(ConsoleController.LOG_Request);

app.use('/', UserRouter);
app.use('/admin', AdminRouter);
app.use(ConsoleController.LOG_Not_Found);
app.use(ErrorController.SEND_ERROR);

mongo_db.mongoConnect((client) => {
    app.listen(port, hostname, () => {
        console.log(`\n\nServer succesfully started at ${hostname}:${port}\n`);
    });
})

