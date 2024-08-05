import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { CategoryCreateDTO } from './category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  /** lấy thông tin 1 category */
  async category(
    todoWhereUniqueInput: Prisma.CategoryWhereUniqueInput,
  ): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: todoWhereUniqueInput,
    });
  }

  /** lấy nhiều category */
  async categories(params: {
    skip?: number;
    take?: number;
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByWithRelationInput;
  }): Promise<Category[]> {
    const { skip, take, where, orderBy } = params;
    return this.prisma.category.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  /** tạo category */
  async createCategory(data: CategoryCreateDTO): Promise<Category> {
    return this.prisma.category.create({
      data,
    });
  }

  /** cập nhật category */
  async updateCategory(params: {
    where: Prisma.CategoryWhereUniqueInput;
    data: Prisma.CategoryUpdateInput;
  }): Promise<Category> {
    const { where, data } = params;
    return this.prisma.category.update({ where, data });
  }

  /** xóa category */
  async deleteCategory(
    where: Prisma.CategoryWhereUniqueInput,
  ): Promise<Category> {
    return this.prisma.category.delete({
      where,
    });
  }

  /** kiểm tra category và user */
  async checkCategoryAndUser(params: { id: string }, req: any): Promise<boolean> {
    const is_exist = await this.category({ category_id: params.id });
    // * kiểm tra todo có tồn tại không
    if (!is_exist) throw new NotFoundException('Todo not found');

    /** kiểm tra user có quyền chỉnh sửa todo này không */
    if (is_exist.user_id !== req.user.sub)
      throw new UnauthorizedException('Unauthorized');

    return true;
  }
}
