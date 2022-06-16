import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import secrets from "../secrets.json";

const authenticate_user = (req: Request): { error: string; id: string } => {
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
        output.id = jwt_payload._id;
    } catch (error) {
        output.error = "Invalid token";
    }
    return output;
};

export const getTask = async (req: Request, res: Response) => {
    const auth = authenticate_user(req);
    if (auth.error) {
        return res.status(403).send(auth.error);
    }

    return res.send("GET task: " + req.params.id || 0);
};

export const addTask = async (req: Request, res: Response) => {
    const auth = authenticate_user(req);
    if (auth.error) {
        return res.status(403).send(auth.error);
    }

    return res.send("POST new task");
};

export const updateTask = async (req: Request, res: Response) => {
    const auth = authenticate_user(req);
    if (auth.error) {
        return res.status(403).send(auth.error);
    }

    return res.send("PUT task: " + req.params.id);
};

export const deleteTask = async (req: Request, res: Response) => {
    const auth = authenticate_user(req);
    if (auth.error) {
        return res.status(403).send(auth.error);
    }

    return res.send("DELETE task: " + req.params.id);
};
