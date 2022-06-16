import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import secrets from "../secrets.json";
import { ITask } from "./task.model";

export interface IUser {
    name: string;
    email: string;
    password: string;
    tasks: ITask[];
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: "Task",
        },
    ],
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, secrets.JWTPRIVATEKEY, {
        expiresIn: "7d",
    });
    return token;
};

export const User = model<IUser>("User", userSchema);
