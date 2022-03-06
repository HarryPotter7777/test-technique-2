import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {

    constructor() {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            keepConnectionAlive: true,
            type: 'postgres',
            url: 'localhost',
            username: 'admin',
            password: 'admin',
            database: 'todo',
            synchronize: true,
            port: 5432,
            entities: [`../src/**/*.entity{.ts,.js}`],
    };
  }
}