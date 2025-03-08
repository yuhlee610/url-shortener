import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(
      map((data) => {
        if (typeof data === 'string') {
          return { data };
        }

        if (typeof data === 'undefined') {
          return { data: 'ok' };
        }

        const { metadata, ...rest } = data;
        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          data: rest,
          metadata,
        };
      }),
    );
  }
}
