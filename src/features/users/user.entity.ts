import { ObjectType, Field } from '@nestjs/graphql';
import { Provider } from '../../auth/models/provider.mode';

@ObjectType()
export class User {
  @Field()
  id: number;

  @Field()
  providerId: string;

  @Field()
  provider: Provider;

  @Field()
  username: string;

  @Field()
  name: string;
}
