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
    // user
    app.route("/user").put(updateUser).delete(deleteUser);
    // auth
    app.route("/register").post(registerUser);
    app.route("/login").post(loginUser);
    //task
    app.route("/task")
        .get((req: Request, res: Response) => {
            return res.send("GET tasks");
        })
        .post((req: Request, res: Response) => {
            return res.send("POST new task");
        });
    app.route("/task/:id")
        .get((req: Request, res: Response) => {
            return res.send("GET task: " + req.params.id);
        })
        .put((req: Request, res: Response) => {
            return res.send("PUT task: " + req.params.id);
        })
        .delete((req: Request, res: Response) => {
            return res.send("DELETE task: " + req.params.id);
        });
};

export default routes;
