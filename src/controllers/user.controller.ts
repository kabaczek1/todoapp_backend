import { User, IUser } from "../models/user.model";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

export async function run() {
    //await connect(secrets.DB);

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
