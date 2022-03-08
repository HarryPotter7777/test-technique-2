import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { TodoService } from '../todo/todo.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { CreateTodoDto } from 'src/todo/dto/create-todo';
import { Todo } from '../todo/todo.entity';

@Injectable()
export class Seeder {
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>,
    ) { }
    async seed() {
        for (let i = 0; i < 5; i++) {
            try {
                await this.todoRepository.create({
                    title: `title_seed_${i}`,
                    description: ''
                } as CreateTodoDto)
            } catch (err) {
                console.log(err);
            }
        }
    }
}