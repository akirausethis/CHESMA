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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoterService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const voter_model_1 = require("../model/voter-model");
const user_validation_1 = require("../validation/user-validation");
const validation_1 = require("../validation/validation");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
class VoterService {
    static register(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const registerReq = validation_1.Validation.validate(user_validation_1.UserValidation.REGISTER, req);
            const email = yield database_1.prismaClient.voter.findFirst({
                where: {
                    email: registerReq.email
                },
            });
            if (email) {
                throw new response_error_1.ResponseError(400, "User already exists!");
            }
            else {
                registerReq.password = yield bcrypt_1.default.hash(registerReq.password, 10);
            }
            const user = yield database_1.prismaClient.voter.create({
                data: {
                    email: registerReq.email,
                    password: registerReq.password,
                    token: (0, uuid_1.v4)()
                }
            });
            return (0, voter_model_1.toVoterResponse)(user);
        });
    }
    static login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginRequest = validation_1.Validation.validate(user_validation_1.UserValidation.LOGIN, request);
            let user = yield database_1.prismaClient.voter.findFirst({
                where: {
                    email: loginRequest.email,
                },
            });
            if (!user) {
                throw new response_error_1.ResponseError(400, "Invalid username or password!");
            }
            const passwordIsValid = yield bcrypt_1.default.compare(loginRequest.password, user.password);
            if (!passwordIsValid) {
                throw new response_error_1.ResponseError(400, "Invalid username or password!");
            }
            user = yield database_1.prismaClient.voter.update({
                where: {
                    id: user.id,
                },
                data: {
                    token: (0, uuid_1.v4)(),
                },
            });
            const response = (0, voter_model_1.toVoterResponse)(user);
            return response;
        });
    }
    static logout(voter) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.prismaClient.voter.update({
                where: {
                    id: voter.id,
                },
                data: {
                    token: null,
                },
            });
            return "Logout Successful!";
        });
    }
}
exports.VoterService = VoterService;
