"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCompetitionResponse = toCompetitionResponse;
exports.toCompetitionResponseList = toCompetitionResponseList;
function toCompetitionResponse(team) {
    return {
        id: team.id,
        name: team.name,
    };
}
function toCompetitionResponseList(teams) {
    const result = teams.map((team) => {
        return {
            id: team.id,
            name: team.name,
        };
    });
    return result;
}
