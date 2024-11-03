import {GraphQLObjectType, GraphQLNonNull, GraphQLList} from 'graphql';
import { MemberType } from '../types/member-types.js';

export const Mutations = new GraphQLObjectType ({
    name: "Mutations",
    fields: ()=>( {
      memberTypes: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MemberType))),
        resolve: async (source, args, context) => {
          return context.memberType.findMany();
        },
      },
    
    // createUser: {
    //     type: User!,
    //     resolve: dto: CreateUserInput! },

    // createProfile: {
    //   type: Profile,
    //    dto: CreateProfileInput!: Profile!
    // }
    // createPost(dto: CreatePostInput!): Post!
    // changePost(id: UUID!, dto: ChangePostInput!): Post!
    // changeProfile(id: UUID!, dto: ChangeProfileInput!): Profile!
    // changeUser(id: UUID!, dto: ChangeUserInput!): User!
    // deleteUser(id: UUID!): String!
    // deletePost(id: UUID!): String!
    // deleteProfile(id: UUID!): String!
    // subscribeTo(userId: UUID!, authorId: UUID!): String!
    // unsubscribeFrom(userId: UUID!, authorId: UUID!): String!
    })

  })