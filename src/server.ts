import express from "express";
import helmet from "helmet";
import { serverConfig } from "./server-config";
import { EnvConfig } from "./shared/infrastructure/config/env/env-config";
import { errorHandlerMiddleware } from "./shared/infrastructure/middlewares/error-handler-middleware";
import { CustomLogger } from "./shared/infrastructure/providers/logger/custom-logger-provider";

const server = express();
const env = new EnvConfig();
const logger = new CustomLogger();
const { routes } = serverConfig(env);

server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(errorHandlerMiddleware);
server.use(routes);

server.get("/ping", (req, res)=> {
    res.status(200).json({ pong: "pong" });
});

server.listen(env.getPort(), ()=> {
    logger.info(`server is working on the port: ${env.getPort()}`)
});