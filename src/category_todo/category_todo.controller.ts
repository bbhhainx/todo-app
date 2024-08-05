import { CategoryTodoService } from "./category_todo.service";



export class CategoryTodoController {
    constructor(private readonly categoryTodoService: CategoryTodoService) {}
}