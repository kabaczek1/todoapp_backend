import { Express, NextFunction, Request, Response } from "express";
import { run } from "./controllers/user.controller";

const routes = (app: Express) => {
    app.route("/")
        .get((req: Request, res: Response) => {
            return res.send("GET");
        })
        .post((req: Request, res: Response) => {
            return res.send("POST");
        })
        .put((req: Request, res: Response) => {
            return res.send("PUT");
        })
        .delete((req: Request, res: Response) => {
            return res.send("DELETE");
        });

    app.route("/user").get(async (req: Request, res: Response) => {
        let test = await run().catch((err) => console.log(err));
        return res.json(test);
    });
};

export default routes;
