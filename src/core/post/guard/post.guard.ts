import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

import { PostEntity } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { POST_ERROR } from '../enum/post-error.enum';

@Injectable()
export class PostGuard implements CanActivate {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { params } = request;

    const postId = params.postId;

    if (!postId) {
      throw new BadRequestException('Post Guard Error');
    }

    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['user', 'project'],
    });

    if (!post) {
      throw new BadRequestException(POST_ERROR.NOT_FOUND);
    }

    request.post = post;

    return true;
  }
}
