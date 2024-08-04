import {
  All,
  Controller,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';
import { PrismaClientErrorFilter } from './filters/prisma-exception.filter';
import { AllParams } from './decorator/params.decorator';

@Controller()
@UseFilters(new PrismaClientErrorFilter())
@UseGuards(AuthGuard)
export class AppController {
  constructor() {}

  @All('all-params/:param')
  async getAllParams(
    @AllParams() params: { body: string; param: string; query: string },
  ): Promise<string> {
    return 'All Params: ' + JSON.stringify(params);
  }
}
