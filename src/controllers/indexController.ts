import {Request, Response, NextFunction} from "express";
import {validationResult} from "express-validator";
import * as mail from "../handlers/mail";

export const home = (req: Request, res: Response) => {
    res.render("home", {title: "Home | CSD"});
};

export const profile = (req: Request, res: Response) => {
    res.render("profile", {title: "Profile | CSD"});
};

export const search = (req: Request, res: Response) => {
    res.render("search", {title: "Explore | CSD"});
};

export const contact = (req: Request, res: Response) => {
    res.render("contact", {title: "Contact | CSD"});
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
