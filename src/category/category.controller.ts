import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Request, UseFilters, UseGuards } from '@nestjs/common';
import { Res } from 'src/decorator/response.decorator';
import { IResponse } from 'src/interface/response';
import { CategoryCreateDTO } from './category.dto';
import { CategoryService } from './category.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { PrismaClientErrorFilter } from 'src/filters/prisma-exception.filter';
import { UserService } from 'src/user/user.service';

@Controller()
@UseFilters(new PrismaClientErrorFilter())
@UseGuards(AuthGuard)
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly userService: UserService
  ) {}
  /** lấy tất cả danh mục */
  @Get('category')
  async getAllCategory(@Res() res: IResponse, @Request() req: any): Promise<void> {
    try {
      // lấy ra các bản ghi danh mục mà người dùng hiện tại đã tạo
      const category = await this.categoryService.categories({
        where: { user_id: req.user.sub },
      });
      res.ok(category);
    } catch (error) {
      res.err(error);
    }
  }

  /** tạo danh mục */
  @Post('category')
  async createCategory(
    @Res() res: IResponse,
    @Body() categoryData: CategoryCreateDTO,
    @Request() req: any
  ): Promise<void> {
    try {
      const user = await this.userService.user({ user_id: req.user.sub });
      //* kiểm tra user có tồn tại không
      if (!user) throw new NotFoundException('User not found');
      // * Tạo mới danh mục
      const category = await this.categoryService.createCategory({
        ...categoryData,
        user_id:  req.user.sub,
      });
      res.ok(category);
    } catch (error) {
      res.err(error);
    }
  }

  /** cập nhật danh mục */
  @Put('category/:id')
  async updateCategory(
    @Res() res: IResponse,
    @Body() categoryData: CategoryCreateDTO,
    @Param() params: { id: string },
    @Request() req: any
  ): Promise<void> {
    try {
      // kiểm tra tồn tại của danh mục và quyền chỉnh sửa của user
      await this.categoryService.checkCategoryAndUser(params, req);

      // chỉnh sửa danh mục
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
  async deleteCategory(
    @Res() res: IResponse,
    @Param() params: { id: string },
    @Request() req: any
  ): Promise<void> {
    try {
      // kiểm tra tồn tại của danh mục và quyền chỉnh sửa của user
      await this.categoryService.checkCategoryAndUser(params, req);

      //xóa danh mục
      const category = await this.categoryService.deleteCategory({
        category_id: params.id,
      });
      res.ok(category);
    } catch (error) {
      res.err(error);
    }
  }
}
