"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const public_router_1 = require("../routes/public-router");
const api_1 = require("../routes/api");
const error_middleware_1 = require("../middlware/error-middleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "X-API-TOKEN"],
    credentials: true
}));
app.use(express_1.default.json());
app.use(public_router_1.publicRouter);
app.use(api_1.apiRouter);
app.use(error_middleware_1.errorMiddleware);
exports.default = app;
