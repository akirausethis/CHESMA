import dotenv from "dotenv";
dotenv.config();

import app from "./application/app";
import { logger } from "./application/logging";

const PORT = 3000;

app.listen(PORT, '0.0.0.0', () => {
    logger.info(`Listening on http://0.0.0.0:${PORT}`);
});