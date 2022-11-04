import {
  Controller,
  Body,
  Post,
  Get,
  Patch,
  Delete,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { GetUser } from '../dummy-user/decorator/user.decorator';
import { GetPost } from './decorator/get-post.decorator';
import { UserEntity } from '../dummy-user/dummy-user.entity';
import { GetProject } from '../project/decorator/project.decorator';
import { ProjectEntity } from '../project/project.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostListDto } from './dto/get-post-list.dto';
import { GetPostDto } from './dto/get-post.dto';
import { GetPostShortDto } from './dto/get-post-short.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';
import { PostGuard } from './guard/post.guard';
import { ProjectGuard } from '../project/guard/project.guard';
import { PostProjectGuard } from './guard/post-project.guard';
import { AccountGuard } from '../dummy-user/guard/account.guard';

@Controller('')
export class PostController {
  constructor(private postService: PostService) {}

  @Post('project/:projectId/post')
  @UseGuards(AccountGuard, ProjectGuard)
  async createPost(
    @Body(ValidationPipe) createPostDto: CreatePostDto,
    @GetUser() user: UserEntity,
    @GetProject() project: ProjectEntity,
  ): Promise<CreatePostDto> {
    return this.postService.createPost(createPostDto, user, project);
  }

  @Get('project/:projectId/post')
  @UseGuards(ProjectGuard)
  async GetPostList(
    @GetProject() project: ProjectEntity,
  ): Promise<GetPostListDto> {
    return this.postService.getPostList(project);
  }

  @Get('project/:projectId/post/:postId')
  @UseGuards(ProjectGuard, PostGuard, PostProjectGuard)
  async GetPostData(@GetPost() post: PostEntity): Promise<GetPostDto> {
    return this.postService.getPost(post);
  }

  @Patch('project/:projectId/post/:postId')
  @UseGuards(ProjectGuard, PostGuard, PostProjectGuard)
  async UpdatePost(
    @GetPost() post: PostEntity,
    @Body(ValidationPipe) updatePostDto: UpdatePostDto,
  ): Promise<GetPostShortDto> {
    return this.postService.updatePost(post, updatePostDto);
  }

  @Delete('project/:projectId/post/:postId')
  @UseGuards(ProjectGuard, PostGuard, PostProjectGuard)
  async DeletePost(@GetPost() post: PostEntity): Promise<void> {
    return this.postService.deletePost(post);
  }
}
