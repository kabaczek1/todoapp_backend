import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import secrets from "../secrets.json";

export interface IUser {
    name: string;
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, secrets.JWTPRIVATEKEY, {
        expiresIn: "7d",
    });
    return token;
};

export const User = model<IUser>("User", userSchema);
