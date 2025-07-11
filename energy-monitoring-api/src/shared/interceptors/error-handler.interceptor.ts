import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorHandlerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ErrorHandlerInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        const request = context.switchToHttp().getRequest();
        const { method, url, ip, user } = request;

        // Log error details
        this.logger.error(
          `Error in ${method} ${url} - IP: ${ip} - User: ${user?.id || 'anonymous'}`,
          error.stack,
        );

        // Database connection errors
        if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
          return throwError(
            () =>
              new HttpException(
                'Database connection error',
                HttpStatus.SERVICE_UNAVAILABLE,
              ),
          );
        }

        // Prisma errors
        if (error.code === 'P2002') {
          return throwError(
            () => new HttpException('Duplicate entry', HttpStatus.CONFLICT),
          );
        }

        if (error.code === 'P2025') {
          return throwError(
            () => new HttpException('Record not found', HttpStatus.NOT_FOUND),
          );
        }

        // JWT errors
        if (error.name === 'JsonWebTokenError') {
          return throwError(
            () => new HttpException('Invalid token', HttpStatus.UNAUTHORIZED),
          );
        }

        if (error.name === 'TokenExpiredError') {
          return throwError(
            () => new HttpException('Token expired', HttpStatus.UNAUTHORIZED),
          );
        }

        // Validation errors
        if (error.status === HttpStatus.BAD_REQUEST) {
          return throwError(() => error);
        }

        // Unknown errors - don't expose internal details
        return throwError(
          () =>
            new HttpException(
              'Internal server error',
              HttpStatus.INTERNAL_SERVER_ERROR,
            ),
        );
      }),
    );
  }
}
