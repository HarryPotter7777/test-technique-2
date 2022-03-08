import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from '../todo/todo.module';
import { TodoService } from 'src/todo/todo.service';
import { Seeder } from './seeder.service';
import { Todo } from '../todo/todo.entity';

/**
 * Import and provide seeder classes.
 *
 * @module
 */
 @Module({
    imports: [
        TypeOrmModule.forFeature([Todo])
    ],
    providers: [Seeder],
  })
  export class SeederModule {}