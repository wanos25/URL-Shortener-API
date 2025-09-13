import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";
import errorHandler from "./middleware/errorHandler";
import rateLimiter from "./middleware/rateLimiter";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(rateLimiter);

app.use("/api", routes);

import { redirectShort } from "./controllers/urlController";
app.get("/u/:code", redirectShort);

app.use(errorHandler);

export default app;
