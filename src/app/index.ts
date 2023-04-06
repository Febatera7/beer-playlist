import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import databaseConnect from "../database";
import express from "express";
import routes from "./routes";

const { APP_VERSION } = process.env;

const app: express.Application = express();

databaseConnect();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(`/${APP_VERSION}`, routes);

export default app;
