"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCompetitionResponse = toCompetitionResponse;
exports.toCompetitionResponseList = toCompetitionResponseList;
function toCompetitionResponse(competition) {
    return {
        id: competition.id,
        name: competition.title,
        team_score_1: competition.team1_score,
        team_score_2: competition.team2_score,
        team_1_id: competition.team1_id,
        team_2_id: competition.team2_id,
        status: competition.status,
        type: competition.type,
    };
}
function toCompetitionResponseList(competitions) {
    const result = competitions.map((competition) => {
        return {
            id: competition.id,
            name: competition.title,
            team_score_1: competition.team1_score,
            team_score_2: competition.team2_score,
            team_1_id: competition.team1_id,
            team_2_id: competition.team2_id,
            status: competition.status,
            type: competition.type,
        };
    });
    return result;
}
