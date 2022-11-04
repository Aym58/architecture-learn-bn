import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';

import { PostEntity } from './post.entity';
import { UserEntity } from '../dummy-user/dummy-user.entity';
import { ProjectEntity } from '../project/project.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { POST_ERROR } from './enum/post-error.enum';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  async createPost(
    createPostDto: CreatePostDto,
    user: UserEntity,
    project: ProjectEntity,
  ): Promise<PostEntity> {
    const { text } = createPostDto;
    const post = new PostEntity();

    post.text = text;
    post.user = user;
    post.project = project;

    try {
      await post.save();
      return post;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(POST_ERROR.ALREADY_EXISTS);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getPostList(project: ProjectEntity): Promise<PostEntity[]> {
    const query = this.createQueryBuilder('post');

    query.leftJoin('post.project', 'project');
    query.where(`project.id = ${project.id}`);
    query.addOrderBy('post.id', 'DESC');
    query.select(['post.id', 'post.text', 'project.id']);

    return query.getMany();
  }

  async updatePost(post: PostEntity, updatePostDto: UpdatePostDto) {
    const { text } = updatePostDto;
    if (text && text !== post.text) {
      post.text = text;
    }
    await post.save();
    return post;
  }
}
