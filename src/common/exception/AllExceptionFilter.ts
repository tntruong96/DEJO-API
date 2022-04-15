import { ArgumentsHost, Catch, ExceptionFilter, HttpCode, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { Response } from "express";


@Catch()
export class AllExceptionFilter implements ExceptionFilter{

    constructor(private logger: Logger){}

    catch(exception: HttpException | Error, host: ArgumentsHost) {
        const ctx: HttpArgumentsHost = host.switchToHttp();
        const response: Response = ctx.getResponse();
        
        //handle message error
        this.handleMessage(exception);
        this.handleResponse(response, exception);
    }


    private handleMessage(exception: HttpException| Error) {
        let msg = "Internal Server Error";
        if(exception instanceof HttpException){
            msg = JSON.stringify(exception.getResponse());
        } else if (exception instanceof Error){
            msg = exception.stack.toString();
        }

        this.logger.error(msg);
    }

    private handleResponse(response: Response, exception: HttpException | Error){
        let responseObj: any = { message: 'Internal server error' };
        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

        if(exception instanceof HttpException){
            responseObj = exception.getResponse();
            statusCode = exception.getStatus();
        } else if(exception instanceof Error){
            responseObj = {
                message: exception.stack,
                statusCode
            }
        }
        response.status(statusCode).json(responseObj);
    }

}