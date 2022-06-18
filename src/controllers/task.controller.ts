import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import secrets from "../secrets.json";
import { Task, ITask } from "../models/task.model";
import { User } from "../models/user.model";
import { mongo } from "mongoose";

const authenticate_user = async (
    req: Request
): Promise<{ error: string; id: string }> => {
    const output = { error: "", id: "" };
    const token = req.headers.authorization?.split(" ")[1];
    if (typeof token === "undefined") {
        output.error = "Token not delivered";
        return output;
    }
    try {
        const jwt_payload = jwt.verify(
            token,
            secrets.JWTPRIVATEKEY
        ) as jwt.JwtPayload;
        const user = await User.findOne({ _id: jwt_payload._id });
        if (user) output.id = jwt_payload._id;
        else output.error = "User doesn't exist";
    } catch (error) {
        output.error = "Invalid token";
    }
    return output;
};

export const getTask = async (req: Request, res: Response) => {
    const auth = await authenticate_user(req);
    if (auth.error) {
        return res.status(403).send(auth.error);
    }
    if (req.params.id) {
        try {
            const task = await Task.findOne({
                author: auth.id,
                _id: req.params.id,
            });
            //console.log(task);
            if (task) {
                return res.json(task);
            }
            return res.status(404).send("Wrong id");
        } catch (error) {
            return res.status(404).send("id error");
        }
    }
    const tasks = await Task.find({ author: auth.id });
    //console.log(tasks);
    return res.json(tasks);
};

export const addTask = async (req: Request, res: Response) => {
    const auth = await authenticate_user(req);
    if (auth.error) {
        return res.status(403).send(auth.error);
    }
    //validate
    await new Task({
        ...req.body,
        author: auth.id,
        created_at: Date.now(),
        done: false,
    }).save();
    return res.send("POST new task");
};

export const updateTask = async (req: Request, res: Response) => {
    const auth = await authenticate_user(req);
    if (auth.error) {
        return res.status(403).send(auth.error);
    }
    //validate ...req.body
    if (req.params.id) {
        try {
            const task = await Task.findOneAndUpdate(
                {
                    author: auth.id,
                    _id: req.params.id,
                },
                req.body
            );
            //console.log(req.body);
            if (task) {
                return res.send("task updated");
            }
            return res.status(404).send("no task with that id");
        } catch (error) {
            return res.status(404).send("id error");
        }
    }
    return res.status(404).send("id not provided");
};

export const deleteTask = async (req: Request, res: Response) => {
    const auth = await authenticate_user(req);
    if (auth.error) {
        return res.status(403).send(auth.error);
    }
    if (req.params.id) {
        try {
            const task = await Task.findOneAndDelete({
                author: auth.id,
                _id: req.params.id,
            });
            //console.log(task);
            if (task) {
                return res.send("task deleted");
            }
            return res.status(404).send("no task with that id");
        } catch (error) {
            return res.status(404).send("id error");
        }
    }
    return res.status(404).send("id not provided");
};
