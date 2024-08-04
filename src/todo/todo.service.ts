import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UseFilters,
} from '@nestjs/common';
import { Prisma, Todo } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { TodoCreateDTO } from './todo.dto';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  /** lấy thông tin 1 todo */
  async todo(
    todoWhereUniqueInput: Prisma.TodoWhereUniqueInput,
  ): Promise<Todo | null> {
    return this.prisma.todo.findUnique({
      where: todoWhereUniqueInput,
    });
  }

  /** lấy thông tin nhiều todo */
  async todos(params: {
    skip?: number;
    take?: number;
    where?: Prisma.TodoWhereInput;
    orderBy?: Prisma.TodoOrderByWithRelationInput;
  }): Promise<Todo[]> {
    const { skip, take, where, orderBy } = params;
    return this.prisma.todo.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  /** tạo todo */
  async createtTodo(data: TodoCreateDTO): Promise<Todo> {
    return this.prisma.todo.create({
      data,
    });
  }

  /** cập nhật todo */
  async updateTodo(params: {
    where: Prisma.TodoWhereUniqueInput;
    data: TodoCreateDTO;
  }): Promise<Todo> {
    const { where, data } = params;
    return this.prisma.todo.update({
      data,
      where,
    });
  }

  /** xóa todo */
  async deleteTodo(where: Prisma.TodoWhereUniqueInput): Promise<Todo> {
    return this.prisma.todo.delete({
      where,
    });
  }

  /** kiểm tra todo và user */
  async checkTodoAndUser(params: { id: string }, req: any): Promise<boolean> {
    const is_exist = await this.todo({ todo_id: params.id });
    // * kiểm tra todo có tồn tại không
    if (!is_exist) throw new NotFoundException('Todo not found');

    /** kiểm tra user có quyền chỉnh sửa todo này không */
    if (is_exist.user_id !== req.user.sub)
      throw new UnauthorizedException('Unauthorized');

    return true;
  }
}
