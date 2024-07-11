import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Response } from 'express';

/** Custom phương thức trả về response */
export const Res = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const response = ctx.switchToHttp().getResponse<Response>();
  const ok = (data: any) => response.status(200).json(data);
  const err = (error: any) =>
    response.status(403).json({
      message: error.message || error,
    });
  return { ok, err };
});
