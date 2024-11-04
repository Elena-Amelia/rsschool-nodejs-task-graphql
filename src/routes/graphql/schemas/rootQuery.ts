import { GraphQLList, GraphQLObjectType, GraphQLNonNull } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { MemberType, MemberTypeId } from '../types/member-types.js';
import { Post } from '../types/posts.js';
import { User } from '../types/users.js';
import { Profile } from '../types/profiles.js';

export const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    memberTypes: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MemberType))),
      resolve: async (source, args, context) => {
        return await context.memberType.findMany();
      },
    },
    memberType: {
      type: MemberType,
      args: {
        id: { type: new GraphQLNonNull(MemberTypeId) },
      },
      resolve: async (source, args, context) => {
        return await context.memberType.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    },

    users: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),
      resolve: async (source, args, context) => {
        return await context.user.findMany();
      },
    },

    user: {
      type: User,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (source, args, context) => {
        return await context.user.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    },

    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Post))),
      resolve: async (source, args, context) => {
        return await context.post.findMany();
      },
    }!,
    post: {
      type: Post,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (source, args, context) => {
        return await context.post.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    },
    profiles: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Profile))),
      resolve: async (source, args, context) => {
        return await context.profile.findMany();
      },
    }!,
    profile: {
      type: Profile,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (source, args, context) => {
        return await context.profile.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    },
  }),
});
