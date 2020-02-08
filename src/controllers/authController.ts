import {Request, Response, NextFunction} from "express";
import {validationResult} from "express-validator";
import {User} from "../models/User";
import passport from "passport";
import "../handlers/passport";
import {UserData} from "../models/userModel"
const fetch = require("node-fetch");

export const login = (req: Request, res: Response) => {
    if (req.user) {
        return res.redirect("/");
    }
    res.render("login", {title: "Login | Hackathon Starter Kit"});
};

export const logout = (req: Request, res: Response) => {
    req.logout();
    req.flash("success", "You are now logged out! 👋");
    res.redirect("/login");
};

export const loginForm = (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            //@ts-ignore
            req.flash("error", errors.array().map(err => err.msg));
            res.render("login", {
                title: "Login",
                body: req.body,
                flashes: req.flash(),
            });
        } else {
            if (!req.body.email || !req.body.password) {
                req.flash("error", "Something is wrong with your input");
            }

            passport.authenticate("local", {
                failureRedirect: "/login",
                successReturnToOrRedirect: "/posts",
                failureFlash: "Invalid Email or Password",
                successFlash: "You are now logged in!",
            })(req, res);
        }
    } catch (e) {
        throw new Error(e);
    }
};

export const register = (req: Request, res: Response) => {
    res.render("register", {title: "Register | Hackathon Starter Kit"});
};

export const registerForm = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        //@ts-ignore
        req.flash("error", errors.array().map(err => err.msg));
        res.render("register", {
            title: "Register",
            body: req.body,
            flashes: req.flash(),
        });
    } else {
        const user = new User({email: req.body.email});
        
        let rollno = 106117001;
        let ldapData: any = await fetch(`http://delta.nitt.edu/ldap/info/${rollno}?key=tpulpGE0O5`)
        ldapData = await ldapData.json()
        console.log(ldapData);
        let userData = {
            name: ldapData.name,
            username: ldapData.username,
            phoneNumber: ldapData.phone,
            year: Number(ldapData.username[4]+ldapData.username[5])+4,
            department: ldapData.dept,
            rollNo: ldapData.username,
            //@ts-ignore
            friendList: [],
            rating: 2.5,
            subscription: ''
        }
        let newUser = new UserData(userData)
        await newUser.save()

        await User.register(user, req.body.password, function(err) {
            if (err) {
                req.flash("error", `${err.message}`);
                res.redirect("/register");
            } else {
                req.flash("success", `${req.body.email} has been registered! Please Login`);
                res.redirect("/login");
            }
        });
    }
};
