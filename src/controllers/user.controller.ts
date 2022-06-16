import { Request, Response } from "express";
import bcrypt from "bcrypt";
import secrets from "../secrets.json";
import { User, IUser } from "../models/user.model";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import jwt from "jsonwebtoken";

// export async function run() {
//     const user = new User({
//         name: "test",
//         email: "test@test.test",
//         password: "aaa",
//     });
//     await user.save();

//     console.log(user.email);
//     return user.email;
// }

export const validate = (data: IUser) => {
    const schema = Joi.object({
        name: Joi.string().required().label("Name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
    });
    return schema.validate(data);
};

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });
        const user = await User.findOne({ email: req.body.email });
        if (user)
            return res.status(409).send({ message: "Email already in use!" });
        const salt = await bcrypt.genSalt(Number(secrets.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        await new User({ ...req.body, password: hashPassword }).save();
        res.status(201).send({ message: "User created" });
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
};

const validate_login = (data: Partial<IUser>) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { error } = validate_login(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });
        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res
                .status(401)
                .send({ message: "Incorrect email or password!" });
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword)
            return res
                .status(401)
                .send({ message: " Incorrect email or password" });
        //@ts-ignore
        const token = user.generateAuthToken();
        res.status(200).send({ data: token, message: "Logged in" });
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (typeof token === "undefined") {
            res.status(403).send({ message: "Forbidden" });
            return;
        }
        try {
            const jwt_payload = jwt.verify(
                token,
                secrets.JWTPRIVATEKEY
            ) as jwt.JwtPayload;
            const user_id: string = jwt_payload._id;
            // console.log(user_id);
            const user = await User.findOneAndDelete({ _id: user_id });
            // console.log(user);
            if (user) {
                res.status(200).send({ message: "User deleted" });
                return;
            }
            res.status(404).send({ message: "User not found" });
        } catch (error) {
            console.log(error);
            res.status(400).send({ message: "Invalid token" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });
        const token = req.headers.authorization?.split(" ")[1];
        if (typeof token === "undefined") {
            res.status(403).send({ message: "Forbidden" });
            return;
        }
        try {
            const jwt_payload = jwt.verify(
                token,
                secrets.JWTPRIVATEKEY
            ) as jwt.JwtPayload;
            const user_id: string = jwt_payload._id;
            // console.log(user_id);
            let user = await User.findOne({ _id: user_id });
            // console.log(user);
            if (user) {
                const salt = await bcrypt.genSalt(Number(secrets.SALT));
                const hashPassword = await bcrypt.hash(req.body.password, salt);
                // @ts-ignore
                await user?.updateOne({ ...req.body, password: hashPassword });
                res.status(200).send({ message: "User updated" });
                return;
            }
            res.status(404).send({ message: "User not found" });
        } catch (error) {
            console.log(error);
            res.status(400).send({ message: "Invalid token" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" });
    }
};
