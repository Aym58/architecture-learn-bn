import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../dummy-user/dummy-user.entity';
import { ProjectEntity } from '../project/project.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostListDto } from './dto/get-post-list.dto';
import { GetPostShortDto } from './dto/get-post-short.dto';
import { GetPostDto } from './dto/get-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
  ) {}

  async createPost(
    createPostDto: CreatePostDto,
    user: UserEntity,
    project: ProjectEntity,
  ): Promise<GetPostShortDto> {
    const post = await this.postRepository.createPost(
      createPostDto,
      user,
      project,
    );

    return { text: post.text, id: post.id };
  }

  async getPostList(project: ProjectEntity): Promise<GetPostListDto> {
    const list = await this.postRepository.getPostList(project);
    return { list };
  }

  async getPost(post: PostEntity): Promise<GetPostDto> {
    return {
      id: post.id,
      text: post.text,
      createDate: post.createDate,
      project: post.project.id,
      user: post.user.id,
    };
  }

  async updatePost(
    post: PostEntity,
    updatePostDto: UpdatePostDto,
  ): Promise<GetPostShortDto> {
    post = await this.postRepository.updatePost(post, updatePostDto);

    return {
      id: post.id,
      text: post.text,
    };
  }

  async deletePost(post: PostEntity): Promise<void> {
    await post.remove();
  }
}
