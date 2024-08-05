import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CategoryTodoService {
    constructor(private prisma: PrismaService){}
    async createTodoCategory(data: Prisma.Todo_CategoryCreateInput) {
        return await this.prisma.todo_Category.create({data});
    }

    async deleteTodoCategory(where: Prisma.Todo_CategoryWhereUniqueInput) {
        return await this.prisma.todo_Category.delete({where});
    }
    
}