import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

import { PostModule } from './core/post/post.module';

import { ProjectModule } from './core/project/project.module';
import { DummyUserModule } from './core/dummy-user/dummy-user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    PostModule,
    ProjectModule,
    DummyUserModule,
  ],
})
export class AppModule {}
