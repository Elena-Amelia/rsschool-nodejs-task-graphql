import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, specifiedRules, validate, parse } from 'graphql';
import { schema } from './schemas.js';
import depthLimit from 'graphql-depth-limit';

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
      const { query, variables } = req.body;

      const allValidationRules = [...specifiedRules, depthLimit(5)];
      const errors = validate(schema, parse(query), allValidationRules);
      if (errors.length > 0) {
        return { errors };
      }

      return await graphql({
        schema,
        source: query,
        variableValues: variables,
        contextValue: prisma,
      });
    },
  });
};

export default plugin;
