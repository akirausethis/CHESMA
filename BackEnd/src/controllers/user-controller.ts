import { NextFunction, Request, Response } from "express";
import { LoginUserRequest, RegisterUserRequest, UserResponse } from "../model/user-model";
import { UserService } from "../services/auth-service";
import { UserRequest } from "../type/user-request";

export class AuthController{
    static async register(req: Request, res: Response, next: NextFunction){
        try{
            const request: RegisterUserRequest = req.body as RegisterUserRequest
            const response: UserResponse = await UserService.register(request)

            res.status(200).json({
                data: response
            })
        } catch (error){
            next(error)
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request = req.body as LoginUserRequest
            const response = await UserService.login(request)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    static async logout(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await UserService.logout(req.user!)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }
}