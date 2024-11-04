import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import { User, CreateUserInput, ChangeUserInput } from '../types/users.js';
import { UUIDType } from '../types/uuid.js';
import { Profile, CreateProfileInput, ChangeProfileInput } from '../types/profiles.js';
import { Post, CreatePostInput, ChangePostInput } from '../types/posts.js';

export const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: () => ({
    createUser: {
      type: new GraphQLNonNull(User),
      args: {
        dto: {
          type: new GraphQLNonNull(CreateUserInput),
        },
      },
      resolve: async (source, args, context) => {
        return await context.user.create({
          data: args.dto,
        });
      },
    },

    createProfile: {
      type: new GraphQLNonNull(Profile),
      args: {
        dto: {
          type: new GraphQLNonNull(CreateProfileInput),
        },
      },
      resolve: async (source, args, context) => {
        return await context.profile.create({
          data: args.dto,
        });
      },
    },

    createPost: {
      type: new GraphQLNonNull(Post),
      args: {
        dto: {
          type: new GraphQLNonNull(CreatePostInput),
        },
      },
      resolve: async (source, args, context) => {
        return await context.post.create({
          data: args.dto,
        });
      },
    },

    changePost: {
      type: new GraphQLNonNull(Post),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: {
          type: new GraphQLNonNull(ChangePostInput),
        },
      },
      resolve: async (source, args, context) => {
        return await context.post.update({
          where: { id: args.id },
          data: args.dto,
        });
      },
    },

    changeProfile: {
      type: new GraphQLNonNull(Profile),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: {
          type: new GraphQLNonNull(ChangeProfileInput),
        },
      },
      resolve: async (source, args, context) => {
        return await context.profile.update({
          where: { id: args.id },
          data: args.dto,
        });
      },
    },

    changeUser: {
      type: new GraphQLNonNull(User),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: {
          type: new GraphQLNonNull(ChangeUserInput),
        },
      },
      resolve: async (source, args, context) => {
        return await context.user.update({
          where: { id: args.id },
          data: args.dto,
        });
      },
    },

    deleteUser: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (source, args, context) => {
        await context.user.delete({
          where: {
            id: args.id,
          },
        });
        return '';
      },
    },

    deletePost: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (source, args, context) => {
        await context.post.delete({
          where: {
            id: args.id,
          },
        });
        return '';
      },
    },

    deleteProfile: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (source, args, context) => {
        await context.profile.delete({
          where: {
            id: args.id,
          },
        });
        return '';
      },
    },

    subscribeTo: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (source, args, context) => {
        await context.subscribersOnAuthors.create({
          data: {
            subscriberId: args.userId,
            authorId: args.authorId,
          },
        });
        return '';
      },
    },

    unsubscribeFrom: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (source, args, context) => {
        await context.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
              subscriberId: args.userId,
              authorId: args.authorId,
            },
          },
        });
        return '';
      },
    },
  }),
});
