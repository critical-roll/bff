import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Race {
  // public name: string;
  // public speed: number;
  // public alignment: string;
  // public age: string;
  // public size: string;
  // public sizeDescription: string;
  // public traits: TraitEntity[];
  // public languages: LanguageEntity[];
  // public proficiencies: ProficiencyEntity[];
  // public languageDescription: string;
  // public attributeBonus: RaceAttributeBonusEntity[];

  @Field()
  uuid: string;

  @Field()
  name: string;

  @Field()
  speed: number;

  @Field()
  alignment: string;

  @Field()
  age: string;

  @Field()
  size: string;

  @Field()
  sizeDescription: string;
}
