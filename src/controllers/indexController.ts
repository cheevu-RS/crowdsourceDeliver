import {Request, Response, NextFunction} from "express";
import {validationResult} from "express-validator";
import * as mail from "../handlers/mail";
const safeJsonStringify = require('safe-json-stringify');

import {UserData} from '../models/userModel';

export const home = (req: Request, res: Response) => {
    res.render("home", {title: "Home | CSD"});
};

export const profile = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.redirect("/login");
    }
    
    if(req.params.username){
        console.log("PROFILE",req.params.username);
        try{
            //@ts-ignore
            let userData = await UserData.findOne({username: req.params.username});
            if(!userData)
                throw new Error("User not Found");
            res.render("profile", {title: "Profile | CSD", userData});
        } catch(e){
            console.log(e);
            res.redirect('/404');
        }
    } else{
        console.log("PROFILE-else",req.params.username);
        res.render("profile", {title: "Profile | CSD"});
    } 
};

export const search = (req: Request, res: Response) => {
    if (!req.user) {
        return res.redirect("/login");
    }
    res.render("search", {title: "Explore | CSD"});
};

export const contact = (req: Request, res: Response) => {
    res.render("contact", {title: "Contact | CSD"});
};

export const orderTracking = (req: Request, res: Response) => {
    res.render("orderTracking", {title: "Order Tracking | CSD"});
export const orders = (req: Request, res: Response) => {
    res.render("order", {title: "Orders | CSD"});
};

export const bids = (req: Request, res: Response) => {
console.log("BIDS ARE " + safeJsonStringify(req.path));
res.render("bid", {title: "bids | CSD"});
};

export const notFound = (req: Request, res: Response) => {
    console.log(req.path);
    res.render("404", {title: "Not Found | CSD"});
};

export const contactForm = (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            //@ts-ignore
            req.flash("error", errors.array().map(err => err.msg));
            res.render("contact", {
                title: "Contact",
                body: req.body,
                flashes: req.flash(),
            });
        } else {
            mail.send(req, res);
        }
    } catch (e) {
        throw new Error(e);
    }
};
