import {
  Module,
  NestModule,
  MiddlewareConsumer,
  ValidationPipe,
} from '@nestjs/common';
import { logger } from './chaos-seeds/middleware';
import { ChaosSeedsModule } from './chaos-seeds/chaos-seeds.module';
import { APP_PIPE } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    ChaosSeedsModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [],
    }),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes('*');
  }
}
