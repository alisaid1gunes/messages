import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {ApiResponse} from "../shared/api-response";

@Injectable()
export class CustomResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<any>> {
        return next.handle().pipe(
            map(data => {
                const customResponse = {
                    success: true,
                    message: data.message,
                    data: data.result,
                };
                return customResponse;
            }),
        );
    }
}
