import { EntityRepository, Repository } from 'typeorm';

import { UserEntity } from './dummy-user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}
