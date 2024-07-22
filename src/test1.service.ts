import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class Test1Service {
  constructor(private prisma: PrismaService) {}
}
