import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../dummy-user.entity';
import { USER_ERROR } from '../enum/user-error.enum';

@Injectable()
export class AccountGuard implements CanActivate {
  constructor(
    @InjectRepository(UserEntity)
    private projectRepository: Repository<UserEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Hardcode dummy user
    const user = await this.projectRepository.findOne({
      where: { id: 1 },
      relations: ['post'],
    });

    if (!user) {
      throw new BadRequestException(USER_ERROR.NOT_FOUND);
    }

    request.user = user;

    return true;
  }
}
