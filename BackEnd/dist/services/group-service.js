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
exports.TeamService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const logging_1 = require("../application/logging");
class TeamService {
    static getAllGroups() {
        return __awaiter(this, void 0, void 0, function* () {
            const teams = yield database_1.prismaClient.team.findMany();
            return teams;
        });
    }
    static getGroup(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const team = yield this.checkGroupIsEmpty(id);
            return team;
        });
    }
    static checkGroupIsEmpty(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const team = yield database_1.prismaClient.team.findUnique({
                where: {
                    id: id,
                },
            });
            if (!team) {
                throw new response_error_1.ResponseError(400, "Competition not found!");
            }
            return team;
        });
    }
    static createGroup(name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.prismaClient.team.create({
                data: {
                    name: name
                }
            });
            return "Team Successfully Created";
        });
    }
    static updateGroup(req) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkGroupIsEmpty(req.id);
            const updateTeam = yield database_1.prismaClient.team.update({
                where: {
                    id: req.id
                },
                data: {
                    name: req.name
                }
            });
            logging_1.logger.info("UPDATE RESULT: " + updateTeam);
            return "Team update was successful!";
        });
    }
    static deleteTeam(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.prismaClient.team.delete({
                where: {
                    id: id
                }
            });
            return "Team delete was successful";
        });
    }
}
exports.TeamService = TeamService;
