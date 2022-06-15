import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import routes from "./routes";
import secrets from "./secrets.json";

const app = express();

app.use(express.json());
app.use(cors());

routes(app);
// app.route("/")
//     .get((req: Request, res: Response) => {
//         return res.send("GET");
//     })
//     .post((req: Request, res: Response) => {
//         return res.send("POST");
//     })
//     .put((req: Request, res: Response) => {
//         return res.send("PUT");
//     })
//     .delete((req: Request, res: Response) => {
//         return res.send("DELETE");
//     });

// const middleware_test = (req: Request, res: Response, next: NextFunction) => {
//     console.log("middleware_test");
//     // @ts-ignore
//     req.params.id = "a";
//     next();
// };

// const getTask = (
//     req: Request<{ id: number }, {}, { name: string }>,
//     res: Response
// ) => {
//     console.log(req.body.name);
//     console.log(req.params.id);
//     return res.send(req.params.id);
// };

app.get("/task", (req: Request, res: Response) => {
    return res.send(`aaa ${secrets.DB}`);
    //return res.redirect("http://google.com");
});

// app.get("/api/task/:id", [middleware_test, getTask]);

// app.get("/", (req: Request, res: Response) => {
//     return res.json({ test: "aaa" });
//     //return res.redirect("http://google.com");
// });

// app.post("/", (req: Request, res: Response) => {
//     console.log(req.body);
//     return res.sendStatus(200);
// });

// app.all("/", (req: Request, res: Response) => {
//     return res.sendStatus(404);
// });

const port = 3000;
app.listen(port, () => {
    console.log(`Backend started at http://localhost:${port}`);
});
