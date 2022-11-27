import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/graphql/gql-auth.guard';
import { CurrentUser } from '../../auth/graphql/gql-auth.decorator';
import { User } from './user.entity';
import { UserSession } from './user-session.entity';

@Resolver(() => User)
export class UsersResolver {
  @Query(() => UserSession)
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentUser() user: UserSession) {
    console.log(user);
    return user;
  }
}
