import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express'; // Import Response từ Express

@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Lấy HttpContext từ ExecutionContext
    const httpContext = context.switchToHttp();

    // Lấy đối tượng Response từ HttpContext
    const response = httpContext.getResponse<Response>(); 

    return next.handle().pipe(
      map(data => {
        // Lấy statusCode từ response object
        const statusCode = response.statusCode;

        // Format lại response, sử dụng statusCode đã lấy
        return {
          statusCode: statusCode,
          message: 'Thành công', 
          data: data 
        };
      }),
    );
  }
}