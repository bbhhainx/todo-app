import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user.service';
import { PrismaService } from './prisma.service';
import { TodoService } from './todo.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.dev.db',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UserService, TodoService, PrismaService],
})
export class AppModule {}
