import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { User as UserModel } from '@prisma/client';
import { Todo as TodoModel } from '@prisma/client';
import { Category as CategoryModel } from '@prisma/client';
import { UserService } from './user.service';
import { TodoService } from './todo.service';
import { UserCreateDTO } from './user.dto';
import { TodoCreateDTO } from './todo.dto';
import { CategoryService } from './category.service';
import { CategoryCreateDTO } from './category.dto';
import { AuthGuard } from './auth/auth.guard';
import { Res } from './decorator/response.decorator';
import { IResponse } from './interface/response';
import { PrismaClientErrorFilter } from './filters/prisma-exception.filter';

@Controller()
@UseFilters(new PrismaClientErrorFilter())
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly todoService: TodoService,
    private readonly categoryService: CategoryService,
  ) {}

  /** lấy tất cả tài khoản */
  @Get('user')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async getAllUser(@Res() res: IResponse): Promise<any> {
    const user = await this.userService.users({});
    return user;
  }

  /** tạo mới tài khoản người dùng */
  @Post('user')
  @UseGuards(AuthGuard)
  async signupUser(
    @Res() res: IResponse,
    @Body() userData: UserCreateDTO,
  ): Promise<void> {
    try {
      const user = await this.userService.createUser(userData);

      if (!user) throw 'Tạo tài khoản mới thất bại';
      res.ok(user); // Trả về response thành công với user
    } catch (error) {
      res.err(error); // Trả về response lỗi với thông báo lỗi
    }
  }
  /** cập nhật tài khoản */
  @Put('user/:id')
  @UseGuards(AuthGuard)
  async updateUser(
    @Res() res: IResponse,
    @Body() userData: UserCreateDTO,
    @Param() params: { id: string },
  ): Promise<void> {
    try {
      const user = await this.userService.updateUser({
        where: { user_id: params.id },
        data: userData,
      });
      res.ok(user);
    } catch (error) {
      res.err(error);
    }
  }
  /** xóa tài khoản */
  @Delete('user/:id')
  @UseGuards(AuthGuard)
  async deleteUser(
    @Res() res: IResponse,
    @Param() params: { id: string },
  ): Promise<any> {
    // try {
    const user = await this.userService.deleteUser({ user_id: params.id });
    return user;
    //   res.ok(user);
    // } catch (error) {
    //   res.err(error);
    // }
  }

  /** lấy tất cả todo */
  @Get('todo')
  @UseGuards(AuthGuard)
  async getAllTodo(@Res() res: IResponse): Promise<void> {
    try {
      const todo = await this.todoService.todos({});
      res.ok(todo);
    } catch (error) {
      res.err(error);
    }
  }

  /** tạo mới todo */
  @Post('todo')
  @UseGuards(AuthGuard)
  async createTodo(
    @Res() res: IResponse,
    @Body() todoData: TodoCreateDTO,
  ): Promise<void> {
    try {
      const todo = await this.todoService.createtTodo(todoData);
      res.ok(todo);
    } catch (error) {
      res.err(error);
    }
  }

  /** cập nhật todo */
  @Put('todo/:id')
  @UseGuards(AuthGuard)
  async updateTodo(
    @Res() res: IResponse,
    @Body() todoData: TodoCreateDTO,
    @Param() params: { id: string },
  ): Promise<void> {
    try {
      const todo = await this.todoService.updateTodo({
        where: { todo_id: params.id },
        data: todoData,
      });
      res.ok(todo);
    } catch (error) {
      res.err(error);
    }
  }
  /** xóa todo */
  @Delete('todo/:id')
  @UseGuards(AuthGuard)
  async deleteTodo(
    @Res() res: IResponse,
    @Param() params: { id: string },
  ): Promise<void> {
    try {
      const todo = await this.todoService.deleteTodo({ todo_id: params.id });
      res.ok(todo);
    } catch (error) {
      res.err(error);
    }
  }

  /** lấy tất cả danh mục */
  @Get('category')
  @UseGuards(AuthGuard)
  async getAllCategory(@Res() res: IResponse): Promise<void> {
    try {
      const category = await this.categoryService.categories({});
      res.ok(category);
    } catch (error) {
      res.err(error);
    }
  }

  /** tạo danh mục */
  @Post('category')
  @UseGuards(AuthGuard)
  async createCategory(
    @Res() res: IResponse,
    @Body() categoryData: CategoryCreateDTO,
  ): Promise<void> {
    try {
      const category = await this.categoryService.createCategory(categoryData);
      res.ok(category);
    } catch (error) {
      res.err(error);
    }
  }

  /** cập nhật danh mục */
  @Put('category/:id')
  @UseGuards(AuthGuard)
  async updateCategory(
    @Res() res: IResponse,
    @Body() categoryData: CategoryCreateDTO,
    @Param() params: { id: string },
  ): Promise<void> {
    try {
      const category = await this.categoryService.updateCategory({
        where: { category_id: params.id },
        data: categoryData,
      });
      res.ok(category);
    } catch (error) {
      res.err(error);
    }
  }
  /** xóa danh mục */
  @Delete('category/:id')
  @UseGuards(AuthGuard)
  async deleteCategory(
    @Res() res: IResponse,
    @Param() params: { id: string },
  ): Promise<void> {
    try {
      const category = await this.categoryService.deleteCategory({
        category_id: params.id,
      });
      res.ok(category);
    } catch (error) {
      res.err(error);
    }
  }
}
