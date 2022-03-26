import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(NotFoundException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: NotFoundException, host: ArgumentsHost) {
        throw new Error("Method not implemented.");
        const context = host.switchToHttp();
        const respone = context.getResponse<Response>();
        const request = context.getRequest<Request>();
        const status = exception.getStatus();
        const message = exception.message;


        respone.status(status).json({
            message,
            statusCode: status,
            time: new Date().toISOString()
        })
    }

}