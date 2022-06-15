import { Express, NextFunction, Request, Response } from "express";
import {
    registerUser,
    loginUser,
    deleteUser,
    updateUser,
} from "./controllers/user.controller";

const routes = (app: Express) => {
    app.route("/")
        .get((req: Request, res: Response) => {
            return res.send("GET");
        })
        .post((req: Request, res: Response) => {
            return res.send("POST");
        })
        .put((req: Request, res: Response) => {
            return res.send("PUT");
        })
        .delete((req: Request, res: Response) => {
            return res.send("DELETE");
        });

    app.route("/register").post(registerUser);
    app.route("/login").post(loginUser);
    app.route("/deleteuser").post(deleteUser);
    app.route("/updateuser").post(updateUser);
};

export default routes;
