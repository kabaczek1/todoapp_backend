import { connect } from "mongoose";
import { User } from "../models/user.model";
import secrets from "../secrets.json";

export async function run() {
    await connect(secrets.DB);

    const user = new User({
        name: "test",
        email: "test@test.test",
    });
    await user.save();

    console.log(user.email);
    return user.email;
}
