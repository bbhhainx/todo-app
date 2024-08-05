import { Res } from 'src/decorator/response.decorator';
import { TodoService } from './todo.service';
import { IResponse } from 'src/interface/response';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  UnauthorizedException,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { TodoCreateDTO } from './todo.dto';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { PrismaClientErrorFilter } from 'src/filters/prisma-exception.filter';

@Controller()
@UseFilters(new PrismaClientErrorFilter())
@UseGuards(AuthGuard)
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    private readonly userService: UserService,
  ) {}
  /** lấy tất cả todo */
  @Get('todo')
  async getAllTodo(@Res() res: IResponse, @Request() req: any): Promise<void> {
    try {
      // lấy tất cả todo của người dùng hiện tại đã tạo
      const todo = await this.todoService.todos({
        where: { user_id: req.user.sub },
      });
      res.ok(todo);
    } catch (error) {
      res.err(error);
    }
  }

  /** tạo mới todo */
  @Post('todo')
  async createTodo(
    @Res() res: IResponse,
    @Body() todoData: TodoCreateDTO,
    @Request() req: any,
  ): Promise<void> {
    try {
      const user = await this.userService.user({ user_id: req.user.sub });
      /** kiểm tra user có tồn tại không */
      if (!user) throw new NotFoundException('User not found');
      /** tạo todo */
      const todo = await this.todoService.createtTodo({
        ...todoData,
        user_id: user.user_id,
      });
      res.ok(todo);
    } catch (error) {
      res.err(error);
    }
  }

  /** cập nhật todo */
  @Put('todo/:id')
  async updateTodo(
    @Res() res: IResponse,
    @Body() todoData: TodoCreateDTO,
    @Param() params: { id: string },
    @Request() req: any,
  ): Promise<void> {
    try {
      // kiểm tra tồn tại của todo và quyền chỉnh sửa của user
      await this.todoService.checkTodoAndUser(params, req);

      /** cập nhật todo */
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
  async deleteTodo(
    @Res() res: IResponse,
    @Param() params: { id: string },
    @Request() req: any,
  ): Promise<void> {
    try {
      // kiểm tra tồn tại của todo và quyền chỉnh sửa của user
      await this.todoService.checkTodoAndUser(params, req);

      // * xóa todo
      const todo = await this.todoService.deleteTodo({ todo_id: params.id });
      res.ok(todo);
    } catch (error) {
      res.err(error);
    }
  }
}
