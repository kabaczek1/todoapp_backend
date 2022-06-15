import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import routes from "./routes";
import secrets from "./secrets.json";

const app = express();

app.use(express.json());
app.use(cors());

routes(app);

const port = 3000;
app.listen(port, () => {
    console.log(`Backend started at http://localhost:${port}`);
});
