"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoValidation = void 0;
const zod_1 = require("zod");
class TodoValidation {
}
exports.TodoValidation = TodoValidation;
TodoValidation.CREATE = zod_1.z.object({
    title: zod_1.z.string().min(1).max(100),
    description: zod_1.z.string().min(1).max(300),
    status: zod_1.z.string().min(1).max(100),
    priority: zod_1.z.string().min(1).max(100),
    due_date: zod_1.z.string().min(1).max(100),
});
TodoValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    title: zod_1.z.string().min(1).max(100),
    description: zod_1.z.string().min(1).max(300),
    status: zod_1.z.string().min(1).max(100),
    priority: zod_1.z.string().min(1).max(100),
    due_date: zod_1.z.string().min(1).max(100),
});
