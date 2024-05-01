import {
    Catch,
    ArgumentsHost,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
  
@Catch(Error)
export class DatabaseExceptionInterceptor implements ExceptionFilter {
    
    catch(exception: Error, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();
        const statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        response.status(statusCode).json({
            statusCode,
            message: exception.message,
            error: exception.constructor.name,
        });        
    }
}
