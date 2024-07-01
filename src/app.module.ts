import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user.service';
import { PrismaService } from './prisma.service';
import { TodoService } from './todo.service';
import { CategoryService } from './category.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.dev.db',
    }),
  ],
  controllers: [AppController],
  providers: [
    
    AppService,
    UserService,
    TodoService,
    CategoryService,
    PrismaService,
  ],
})
export class AppModule {}
