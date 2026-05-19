"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./application/app"));
const logging_1 = require("./application/logging");
const PORT = 3000;
app_1.default.listen(PORT, '0.0.0.0', () => {
    logging_1.logger.info(`Listening on http://0.0.0.0:${PORT}`);
});
