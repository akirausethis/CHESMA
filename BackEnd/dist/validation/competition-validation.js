"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompetitionValidation = void 0;
const zod_1 = require("zod");
class CompetitionValidation {
}
exports.CompetitionValidation = CompetitionValidation;
CompetitionValidation.CREATE = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100),
    team_1_id: zod_1.z.number().positive(),
    team_2_id: zod_1.z.number().positive(),
    type: zod_1.z.string().min(1).max(100)
});
CompetitionValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    team_score_1: zod_1.z.number().nonnegative(),
    team_score_2: zod_1.z.number().nonnegative(),
    status: zod_1.z.string().min(1).max(100)
});
