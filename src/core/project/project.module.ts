import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ProjectEntity } from './project.entity';

import { ProjectRepository } from './project.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectRepository, ProjectEntity])],
})
export class ProjectModule {}
