import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TodoModule } from './../src/todo/todo.module';
import { Todo } from '../src/todo/todo.entity';
import { Connection, getConnectionOptions } from 'typeorm';

describe('TodoController (e2e)', () => {
    let app: INestApplication;
    let connection: Connection;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                TodoModule,
                TypeOrmModule.forRootAsync({
                    useFactory: async () => {
                        const config = await getConnectionOptions();
                        return <TypeOrmModuleOptions>{
                            ...config, entities: [Todo],
                            logging: false, synchronize: true,
                            database: 'test',
                            host: 'test_postgres_db'
                        };
                    }
                })
            ],
        })
            .compile();
        app = moduleFixture.createNestApplication();
        connection = app.get(Connection);
        app.useGlobalPipes(new ValidationPipe({
            transform: true
        }));
        app.setGlobalPrefix('api');
        await app.init();
    });

    afterEach(async () => {
        await connection.synchronize(true);
    })

    it(`/CREATE todo`, async () => {
        const todo = { id: 1, title: 'test', description: 'hello world', completed: false };
        const response = await request(app.getHttpServer())
            .post('/api/todo/create')
            .send(todo)
            .expect(201);
        expect(response.body).toEqual(todo);
    });

    it(`/CREATE a todo with a default description value`, async () => {
        const todo = { id: 1, title: 'test', completed: false };
        const response = await request(app.getHttpServer())
            .post('/api/todo/create')
            .send(todo)
            .expect(201);
        expect(response.body).toEqual({ ...todo, description: "" });
    });

    it(`/FIND ONE todo`, async () => {
        const todo = { id: 1, title: 'test', description: 'hello world', completed: false };
        const response = await request(app.getHttpServer())
            .post('/api/todo/create')
            .send(todo)
            .expect(201);
        expect(response.body).toEqual(todo);
        const findOne = await request(app.getHttpServer())
            .post('/api/todo/one')
            .query({ id: 1 })
            .expect(201);
        expect(findOne.body).toEqual(todo);
    });

    it(`/FIND ALL todo`, async () => {
        let todos = [];

        const todo = { id: 1, title: 'test', description: 'hello world', completed: false };
        todos.push(todo);
        const response = await request(app.getHttpServer())
            .post('/api/todo/create')
            .send(todo)
            .expect(201);
        expect(response.body).toEqual(todo);

        const todo2 = { id: 2, title: 'test 2', description: 'hello world 2', completed: false };
        todos.push(todo2);
        const response2 = await request(app.getHttpServer())
            .post('/api/todo/create')
            .send(todo2)
            .expect(201);
        expect(response2.body).toEqual(todo2);

        const findAll = await request(app.getHttpServer())
            .get('/api/todo/all')
            .expect(200);
        expect(findAll.body).toEqual(todos);
    });

    it(`/UPDATE todo`, async () => {
        // create a todo
        const todo = { id: 1, title: 'test', description: 'hello world', completed: false };
        const response = await request(app.getHttpServer())
            .post('/api/todo/create')
            .send(todo)
            .expect(201);
        expect(response.body).toEqual(todo);

        // update a todo
        const update = await request(app.getHttpServer())
            .put(`/api/todo/update?id=1`)
            .send({
                title: 'Update title',
                description: 'Update todo',
                completed: true
            })
            .expect(200);

        // find updated todo
        const updatedTodo = await request(app.getHttpServer())
            .post('/api/todo/one')
            .query({ id: 1 })
            .expect(201);
        expect(updatedTodo.body).toEqual({
            id: 1,
            title: 'Update title',
            description: 'Update todo',
            completed: true
        });
    });

    afterAll(async () => {
        await app.close();
    })
});