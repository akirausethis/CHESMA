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
exports.TodoService = void 0;
const todo_model_1 = require("../model/todo-model");
const database_1 = require("../application/database");
const validation_1 = require("../validation/validation");
const todo_validation_1 = require("../validation/todo-validation");
const response_error_1 = require("../error/response-error");
const logging_1 = require("../application/logging");
class TodoService {
    static getAllTodo(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield database_1.prismaClient.todo.findMany({
                where: {
                    user_id: user.id,
                },
            });
            return (0, todo_model_1.toTodoResponseList)(todo);
        });
    }
    static getTodo(user, todo_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield this.checkTodoIsEmpty(user.id, todo_id);
            return (0, todo_model_1.toTodoResponse)(todo);
        });
    }
    static createTodo(user, req) {
        return __awaiter(this, void 0, void 0, function* () {
            // validate request
            const todoRequest = validation_1.Validation.validate(todo_validation_1.TodoValidation.CREATE, req);
            const todo = yield database_1.prismaClient.todo.create({
                data: {
                    title: todoRequest.title,
                    description: todoRequest.description,
                    status: todoRequest.status,
                    priority: todoRequest.priority,
                    due_date: todoRequest.due_date,
                    user_id: user.id,
                },
            });
            return "Data created successfully!";
        });
    }
    static checkTodoIsEmpty(user_id, todo_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield database_1.prismaClient.todo.findUnique({
                where: {
                    id: todo_id,
                    user_id: user_id,
                },
            });
            if (!todo) {
                throw new response_error_1.ResponseError(400, "Todo not found!");
            }
            return todo;
        });
    }
    static updateTodo(user, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const todoValidation = validation_1.Validation.validate(todo_validation_1.TodoValidation.UPDATE, req);
            yield this.checkTodoIsEmpty(user.id, todoValidation.id);
            const todoUpdate = yield database_1.prismaClient.todo.update({
                where: {
                    id: todoValidation.id,
                    user_id: user.id,
                },
                data: todoValidation,
            });
            logging_1.logger.info("UPDATE RESULT: " + todoUpdate);
            return "Data update was successful!";
        });
    }
    static deleteTodo(user, todo_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkTodoIsEmpty(user.id, todo_id);
            yield database_1.prismaClient.todo.delete({
                where: {
                    user_id: user.id,
                    id: todo_id,
                },
            });
            return "Data has been deleted successfully!";
        });
    }
}
exports.TodoService = TodoService;
