import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/*
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { customPostRepositoryMethods } from './post.repository';
*/

import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostEntity } from './post.entity';

import { ProjectEntity } from '../project/project.entity';
import { ProjectRepository } from '../project/project.repository';

import { UserRepository } from '../dummy-user/user.repository';
import { UserEntity } from '../dummy-user/dummy-user.entity';

// import { PostRepositoryProvider } from './post.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostRepository,
      ProjectRepository,
      UserRepository,
      PostEntity,
      ProjectEntity,
      UserEntity,
    ]),
  ],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
