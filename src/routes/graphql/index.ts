import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql,  GraphQLSchema} from 'graphql';
import { RootQueryType } from './schemas/rootQuery.js';
import { Mutations } from './schemas/mutations.js';


const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      return await graphql({
        schema,
        source: req.body.query,
        variableValues: req.body.variables,
        contextValue: prisma,
      });
    },
  });
};

const schema = new GraphQLSchema({

    query: RootQueryType,
    mutation: Mutations
      
})



export default plugin;
