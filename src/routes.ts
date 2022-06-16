import { Express, NextFunction, Request, Response } from "express";
import {
    registerUser,
    loginUser,
    deleteUser,
    updateUser,
} from "./controllers/user.controller";
import {
    getTask,
    addTask,
    updateTask,
    deleteTask,
} from "./controllers/task.controller";

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
    app.route("/task").get(getTask).post(addTask);
    app.route("/task/:id").get(getTask).put(updateTask).delete(deleteTask);
};

export default routes;
