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
        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = exception.message;

        if (exception instanceof HttpException) {
            statusCode = exception.getStatus();
        } 
        else if (exception instanceof AggregateError) {
            // statusCode = HttpStatus.NOT_FOUND; 
            message = "Impossible de communiquer avec la base de données.";
        }

        response.status(statusCode).json({
            statusCode,
            message,
            error: exception.constructor.name,
        });        
    }
}
