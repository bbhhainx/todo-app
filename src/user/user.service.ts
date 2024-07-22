import { Injectable, UseFilters } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { PrismaClientErrorFilter } from '../filters/prisma-exception.filter';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.prisma.user.findFirst({
      where: {
        user_name: username,
      },
    });
  }

  /** lấy thông tin 1 user */
  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  /** lấy nhiều user */
  async users(params: {
    skip?: number;
    take?: number;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  /** tạo mới user */
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  /** cập nhật user */
  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }
  @UseFilters(new PrismaClientErrorFilter())
  /** xóa user */
  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    await this.prisma.user.findUniqueOrThrow({
      where,
    });
    return this.prisma.user.delete({
      where,
    });
  }
}
