import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

import { ProjectEntity } from '../project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PROJECT_ERROR } from '../enum/project-error.enum';

@Injectable()
export class ProjectGuard implements CanActivate {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { params } = request;

    const projectId = params.projectId;

    if (!projectId) {
      throw new BadRequestException('Post Guard Error');
    }

    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: ['post'],
    });

    if (!project) {
      throw new BadRequestException(PROJECT_ERROR.NOT_FOUND);
    }

    request.project = project;

    return true;
  }
}
