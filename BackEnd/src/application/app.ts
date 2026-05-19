import express from "express";
import cors from "cors"; 
import { publicRouter } from "../routes/public-router";
import { apiRouter } from "../routes/api";
import { errorMiddleware } from "../middlware/error-middleware";

const app = express();

app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "X-API-TOKEN"],
    credentials: true 
}));

app.use(express.json());

app.use(publicRouter);
app.use(apiRouter);

app.use(errorMiddleware);

export default app;