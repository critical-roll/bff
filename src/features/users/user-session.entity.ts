import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserSession {
  @Field()
  id: number;

  @Field()
  username: string;
}
