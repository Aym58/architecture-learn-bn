import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

import { PostEntity } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProjectEntity } from 'src/core/project/project.entity';

@Injectable()
export class PostProjectGuard implements CanActivate {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { project, post }: { project: ProjectEntity; post: PostEntity } =
      request;

    if (!project || !post) {
      throw new BadRequestException('Post or Project Guard Error');
    }

    if (post.project.id !== project.id) {
      throw new BadRequestException('Post not in Project Guard Error');
    }
    return true;
  }
}
