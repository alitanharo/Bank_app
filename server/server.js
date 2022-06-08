const cookieParser = require("cookie-parser");
const express = require("express");
const session = require("express-session");
const server = express()
const userController = require("./controller/user.js")
const transactionController = require("./controller/transaction.js")
const { createError, exeption } = require("./util/Error")

const db = require("./model");
db.sequelize.sync();

server.use(express.json())
server.use(cookieParser());
server.use(session({
    key: 'key',
    secret: '1234ABCDabcd',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000000,
        httpOnly: false
    }
}));

server.use((req, res, next) => {
    if (req.cookies.key && !req.session.user) {
        res.clearCookie('key');
    }
    next();
});


/////////////////////////////////// USER /////////////////////////////////////////


server.get('/api/logout', async (req, res, next) => {
    try {
        req.session.user = undefined;
        res.clearCookie('key');
        res.status(204).send()
    } catch (err) {
        next(err)
    }
})


server.post('/api/user/login', async (req, res, next) => {
    try {
        let { username, password } = req.body
        let user = await userController.login(username, password)
        req.session.user = user;
        res.status(204).send()
    } catch (err) {
        next(err)
    }
})

server.post("/api/user/signUp", async (req, res, next) => {
    try {
        let { username, email, password } = req.body
        let user = await userController.createUser(username, email, password)
        req.session.user = user;
        res.send()
    } catch (err) {
        next(err)
    }
})

server.get("/api/user/profile", async (req, res, next) => {
    try {
        if (!req.session.user) throw createError(exeption.Unauthorized)
        let { accounts, username, email } = await userController.getUserById(req.session.user.id)
        res.send({ accounts, username, email })
    } catch (err) {
        next(err)
    }
})


/////////////////////////////////// Transaction /////////////////////////////////////////


server.post("/api/user/transaction", async (req, res, next) => {
    try {
        if (!req.session.user) throw createError(exeption.Unauthorized)
        let { amount, receiver } = req.body
        await transactionController.createTransaction(receiver, amount, req.session.user.id)
        res.send()
    } catch (err) {
        next(err)
    }
})


server.use((error, req, res, next) => {
    console.log(error);
    if (error.isApplicationException) {
        res.status(error.httpStatusCode).json({ message: error.message });
    } else {
        res.status(500).json({ message: 'System Error' });
    }
    next();
})


/////////////////////////////////// Account /////////////////////////////////////////

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});