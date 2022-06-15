import { connect } from "mongoose";
import secrets from "./secrets.json";
export const connect_to_db = () => {
    try {
        connect(secrets.DB);
        console.log("DB connected");
    } catch (error) {
        console.log(error);
        console.log("DB connection error!");
    }
};
