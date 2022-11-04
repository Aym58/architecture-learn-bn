import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import * as config from 'config';

import { UserEntity } from 'src/core/dummy-user/dummy-user.entity';
import { ProjectEntity } from 'src/core/project/project.entity';
import { PostEntity } from 'src/core/post/post.entity';

const DATABASE_CONFIG = config.get('DATABASE');

export const Entities = [UserEntity, ProjectEntity, PostEntity];

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: DATABASE_CONFIG.TYPE,
  url: process.env.DATABASE_URL || DATABASE_CONFIG.URL,
  entities: Entities,
  ssl: { rejectUnauthorized: false },
  logging: ['query', 'error'],
  synchronize: process.env.TYPEORM_SYNC || DATABASE_CONFIG.SYNCHRONIZE,
};
