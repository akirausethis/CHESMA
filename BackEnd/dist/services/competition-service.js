"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompetitionService = void 0;
const competition_model_1 = require("../model/competition-model");
const database_1 = require("../application/database");
const validation_1 = require("../validation/validation");
const competition_validation_1 = require("../validation/competition-validation");
const response_error_1 = require("../error/response-error");
const logging_1 = require("../application/logging");
class CompetitionService {
    static getAllCompetition(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const competitions = yield database_1.prismaClient.competition.findMany({
                where: {
                    type: req.type
                },
            });
            return (0, competition_model_1.toCompetitionResponseList)(competitions);
        });
    }
    static getCompetition(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const competition = yield this.checkCompetitionIsEmpty(id);
            return (0, competition_model_1.toCompetitionResponse)(competition);
        });
    }
    static createCompetition(req) {
        return __awaiter(this, void 0, void 0, function* () {
            // validate request
            const competitonRequest = validation_1.Validation.validate(competition_validation_1.CompetitionValidation.CREATE, req);
            const competition = yield database_1.prismaClient.competition.create({
                data: {
                    title: competitonRequest.name,
                    team1_score: 0,
                    team2_score: 0,
                    status: "Upcoming",
                    team1_id: competitonRequest.team_1_id,
                    team2_id: competitonRequest.team_2_id,
                    type: competitonRequest.type
                },
            });
            return "Competition created successfully!";
        });
    }
    static checkCompetitionIsEmpty(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const competition = yield database_1.prismaClient.competition.findUnique({
                where: {
                    id: id,
                },
            });
            if (!competition) {
                throw new response_error_1.ResponseError(400, "Competition not found!");
            }
            return competition;
        });
    }
    static updateCompetition(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const competitionValidation = validation_1.Validation.validate(competition_validation_1.CompetitionValidation.UPDATE, req);
            yield this.checkCompetitionIsEmpty(competitionValidation.id);
            const competitionUpdate = yield database_1.prismaClient.competition.update({
                where: {
                    id: competitionValidation.id,
                },
                data: {
                    team1_score: competitionValidation.team_score_1,
                    team2_score: competitionValidation.team_score_2,
                    status: competitionValidation.status
                },
            });
            logging_1.logger.info("UPDATE RESULT: " + competitionUpdate);
            return "Data update was successful!";
        });
    }
    static deleteCompetition(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkCompetitionIsEmpty(id);
            yield database_1.prismaClient.competition.delete({
                where: {
                    id: id,
                },
            });
            return "Data has been deleted successfully!";
        });
    }
}
exports.CompetitionService = CompetitionService;
