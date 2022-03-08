import { NestFactory } from '@nestjs/core';
import { AppModule } from './seed.module';
import { Seeder } from './seeder/seeder.service';

async function bootstrap() {
    NestFactory.createApplicationContext(AppModule)
        .then(appContext => {
            const seeder = appContext.get(Seeder);
            seeder
                .seed()
                .then(() => {
                    console.log('Seeding complete!');
                })
                .catch(error => {
                    throw error;
                })
                .finally(() => appContext.close());
        })
        .catch(error => {
            throw error;
        });
}
bootstrap();