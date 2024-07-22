import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TodoService } from './todo.service';
import { CategoryService } from './category.service';
import { AuthModule } from './auth/auth.module';
import { Test1Service } from './test1.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.dev.db',
    }),
    PrismaModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, TodoService, CategoryService, Test1Service],
})
export class AppModule {}
