import express from "express";

import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import logger from "morgan";
import mongo from "connect-mongo";
import path from "path";
import flash from "connect-flash";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import errorHandler from "errorhandler";
const {userRouter} = require("./routes/userRouter")
const {bidRouter} = require("./routes/bidRouter")
const {orderRouter} = require("./routes/orderRouter")

dotenv.config({path: "variable.env"});
import indexRouter from "./routes/index";
import authRouter from "./routes/auth";
import "./handlers/passport";

import {UserData} from "./models/userModel"


// import environmental variables from our variables.env file

const MongoStore = mongo(session);
// Create Express server
const app = express();

app.use(helmet());
// view engine setup
app.set("views", path.join(__dirname, "../views")); // this is the folder where we keep our pug files
app.set("view engine", "pug"); // we use the engine pug, mustache or EJS work great too
app.get("env") === "development" ? app.use(require("express-status-monitor")()) : "";
app.use(logger("dev"));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, "../public")));

// Takes the raw requests and turns them into usable properties on req.body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
    session({
        name: process.env.SESSION_NAME,
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongooseConnection: mongoose.connection}),
    }),
);

// Passport JS is what we use to handle our logins
app.use(passport.initialize());
app.use(passport.session());

// The flash middleware let's us use req.flash('error', 'Shit!'), which will then pass that message to the next page the user requests
app.use(flash());

// pass variables to our templates + all requests
app.use(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.locals.flashes = req.flash();
    res.locals.user = req.user || null;
    if (req.user) {
        //@ts-ignore
        res.locals.userData = await UserData.findOne({ username: String(req.user.email).slice(0, 9) }) || null;
    } else {
        res.locals.userData = null;
    }
    console.log(res.locals.userData);
    res.locals.currentPath = req.path;
    next();
});

//  Express Routing URLS
app.use('/user', userRouter);
app.use('/bid', bidRouter);
app.use('/order', orderRouter);
app.use("/", indexRouter);
app.use("/auth", authRouter);

// app.get("*", function(req: express.Request, res: express.Response) {
//     return res.status(404).redirect("/404");
// });


if (app.get("env") === "development") {
    app.use(errorHandler());
    app.locals.pretty = true;
}

export default app;
