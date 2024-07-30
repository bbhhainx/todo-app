import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/** Custom phương thức lấy dữ liệu từ query và body và gộp lại với nhau */
export const AllParams = createParamDecorator(
    (data: any, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return {
            ...request.query,
            ...request.body,
            ...request.params
        };
    },
)