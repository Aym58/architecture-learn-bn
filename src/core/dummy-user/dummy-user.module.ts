import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './dummy-user.entity';
import { UserRepository } from './user.repository';

import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, UserEntity])],
})
export class DummyUserModule {}
