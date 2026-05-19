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
exports.TodoController = void 0;
const todo_service_1 = require("../services/todo-service");
class TodoController {
    static getAllTodos(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield todo_service_1.TodoService.getAllTodo(req.user);
                res.status(200).json({
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getTodo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield todo_service_1.TodoService.getTodo(req.user, Number(req.params.todoId));
                res.status(200).json({
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static createTodo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield todo_service_1.TodoService.createTodo(req.user, request);
                res.status(201).json({
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static updateTodo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                request.id = Number(req.params.todoId);
                const response = yield todo_service_1.TodoService.updateTodo(req.user, request);
                res.status(201).json({
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static deleteTodo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield todo_service_1.TodoService.deleteTodo(req.user, Number(req.params.todoId));
                res.status(200).json({
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.TodoController = TodoController;
