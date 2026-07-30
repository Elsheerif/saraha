"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongoose_1 = require("./db/mongoose");
const env_1 = require("./config/env");
const start = async () => {
    await (0, mongoose_1.connectDatabase)();
    app_1.default.listen(env_1.env.port, () => {
        console.log(`Saraha backend is running on http://localhost:${env_1.env.port}`);
    });
};
start().catch((error) => {
    console.error("Unable to start server", error);
    process.exit(1);
});
//# sourceMappingURL=server.js.map