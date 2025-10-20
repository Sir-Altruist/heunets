import express, { Express, Request, Response } from "express";
import cors from "cors";
import routes from "./routes";
import { Logger } from "./libs";
import morgan from "morgan";
// import { rateLimit } from "express-rate-limit";
import dayjs from "dayjs";
import "dotenv/config"
import { StatusCodes } from "./interfaces";

const { PORT } = process.env;
const app: Express = express();
const port = PORT || 8000;

// Cross-origin resource sharing
app.use(cors());


/** Add timestamp format */
morgan.token('timestamp', () => {
    return dayjs().format("YYYY-MM-DD THH:mm:ss")
})

/** Log to the console */
app.use(morgan(":timestamp :method :url :status :response-time ms"));

// parses body request
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));

app.set('trust proxy', 1);

// app.use(
//     rateLimit({
//     // Limit each IP to a certain number of requests every 15 minutes.
//         windowMs: 5 * 60 * 1000,
//         limit: Number(env.RATE_LIMIT),
//         message:
//       "Too many requests from this IP, please try again after 20 minutes.",
//         legacyHeaders: false
//     })
// );

app.get("/", (_, res: Response) => {
    res.send("Heunets Ticket API!!!");
});

app.use("/heunets/v1.0/api", routes);

app.use((_: Request, res: Response) => {
    res.status(StatusCodes.NOT_FOUND).send({ message: 'route not found' })
})


app.listen(port, () => Logger.info(`server running on port: ${port}`));
