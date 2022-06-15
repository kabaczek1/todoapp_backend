import { Request, Response } from "express";
import bcrypt from "bcrypt";
import secrets from "../secrets.json";
import { User, IUser } from "../models/user.model";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

export async function run() {
    const user = new User({
        name: "test",
        email: "test@test.test",
        password: "aaa",
    });
    await user.save();

    console.log(user.email);
    return user.email;
}

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
