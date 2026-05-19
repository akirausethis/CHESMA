"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTodoResponseList = toTodoResponseList;
exports.toTodoResponse = toTodoResponse;
function toTodoResponseList(prismaTodo) {
    const result = prismaTodo.map((todo) => {
        return {
            id: todo.id,
            title: todo.title,
            description: todo.description,
            priority: todo.priority,
            due_date: todo.due_date,
            status: todo.status,
        };
    });
    return result;
}
function toTodoResponse(prismaTodo) {
    return {
        id: prismaTodo.id,
        title: prismaTodo.title,
        description: prismaTodo.description,
        priority: prismaTodo.priority,
        due_date: prismaTodo.due_date,
        status: prismaTodo.status,
    };
}
