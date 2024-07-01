import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { User as UserModel } from '@prisma/client';
import { Todo as TodoModel } from '@prisma/client';
import { Category as CategoryModel } from '@prisma/client';
import { UserService } from './user.service';
import { TodoService } from './todo.service';
import { UserCreateDTO, UserUpdateDTO } from './user.dto';
import { TodoCreateDTO } from './todo.dto';
import { CategoryService } from './category.service';
import { CategoryCreateDTO } from './category.dto';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly todoService: TodoService,
    private readonly categoryService: CategoryService,
  ) {}

  /** lấy tất cả tài khoản */
  @Get('user')
  async getAllUser() {
    return this.userService.users({});
  }

  /** tạo mới tài khoản người dùng */
  @Post('user')
  async signupUser(@Body() userData: UserCreateDTO): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
  /** cập nhật tài khoản */
  @Put('user/:id')
  async updateUser(
    @Body() userData: UserUpdateDTO,
    @Param() params: { id: string },
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { user_id: params.id },
      data: userData,
    });
  }
  /** xóa tài khoản */
  @Delete('user/:id')
  async deleteUser(@Param() params: { id: string }): Promise<UserModel> {
    return this.userService.deleteUser({ user_id: params.id });
  }

  @UseGuards(AuthGuard)
  /** lấy tất cả todo */
  @Get('todo')
  async getAllTodo() {
    return this.todoService.todos({});
  }

  /** tạo mới todo */
  @Post('todo')
  async createTodo(@Body() todoData: TodoCreateDTO): Promise<TodoModel> {
    return this.todoService.createtTodo(todoData);
  }

  /** cập nhật todo */
  @Put('todo/:id')
  async updateTodo(
    @Body() todoData: TodoCreateDTO,
    @Param() params: { id: string },
  ): Promise<TodoModel> {
    return this.todoService.updateTodo({
      where: { todo_id: params.id },
      data: todoData,
    });
  }
  /** xóa todo */
  @Delete('todo/:id')
  async deleteTodo(@Param() params: { id: string }): Promise<TodoModel> {
    return this.todoService.deleteTodo({ todo_id: params.id });
  }

  /** lấy tất cả danh mục */
  @Get('category')
  async getAllCategory() {
    return this.categoryService.categories({});
  }

  /** tạo danh mục */
  @Post('category')
  async createCategory(
    @Body() categoryData: CategoryCreateDTO,
  ): Promise<CategoryModel> {
    return this.categoryService.createCategory(categoryData);
  }

  /** cập nhật danh mục */
  @Put('category/:id')
  async updateCategory(
    @Body() categoryData: CategoryCreateDTO,
    @Param() params: { id: string },
  ): Promise<CategoryModel> {
    return this.categoryService.updateCategory({
      where: { category_id: params.id },
      data: categoryData,
    });
  }
  /** xóa danh mục */
  @Delete('category/:id')
  async deleteCategory(
    @Param() params: { id: string },
  ): Promise<CategoryModel> {
    return this.categoryService.deleteCategory({ category_id: params.id });
  }
}
