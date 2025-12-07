import { makeExecutableSchema } from '@graphql-tools/schema';
import { graphql } from 'graphql';

import { createTrezoaGraphQLContext } from './context';
import { createTrezoaGraphQLTypeDefs } from './schema/type-defs';
import { createTrezoaGraphQLTypeResolvers } from './schema/type-resolvers';

export interface RpcGraphQL {
    query(
        source: Parameters<typeof graphql>[0]['source'],
        variableValues?: Parameters<typeof graphql>[0]['variableValues'],
    ): ReturnType<typeof graphql>;
}

/**
 * Create a GraphQL RPC client resolver.
 *
 * @param rpc       Trezoa RPC client.
 * @param schema    GraphQL schema.
 * @param config    Optional GraphQL resolver configurations.
 * @returns         GraphQL RPC client resolver.
 */
export function createRpcGraphQL(
    rpc: Parameters<typeof createTrezoaGraphQLContext>[0],
    schema: ReturnType<typeof makeExecutableSchema>,
    config?: Partial<Parameters<typeof createTrezoaGraphQLContext>[1]>,
): RpcGraphQL {
    const rpcGraphQLConfig = {
        maxDataSliceByteRange: config?.maxDataSliceByteRange ?? 200,
        maxMultipleAccountsBatchSize: config?.maxMultipleAccountsBatchSize ?? 100,
    };
    return {
        async query(source, variableValues?) {
            const contextValue = createTrezoaGraphQLContext(rpc, rpcGraphQLConfig);
            return await graphql({
                contextValue,
                schema,
                source,
                variableValues,
            });
        },
    };
}

/**
 * Create a Trezoa GraphQL RPC client resolver.
 *
 * Configures the client resolver to use the default Trezoa GraphQL schema.
 *
 * @param rpc       Trezoa RPC client.
 * @param config    Optional GraphQL resolver configurations.
 * @returns         Trezoa GraphQL RPC client resolver.
 */
export function createTrezoaRpcGraphQL(
    rpc: Parameters<typeof createTrezoaGraphQLContext>[0],
    config?: Partial<Parameters<typeof createTrezoaGraphQLContext>[1]>,
): RpcGraphQL {
    const schema = makeExecutableSchema({
        resolvers: createTrezoaGraphQLTypeResolvers(),
        typeDefs: createTrezoaGraphQLTypeDefs(),
    });
    return createRpcGraphQL(rpc, schema, config);
}

export { createTrezoaGraphQLTypeDefs, createTrezoaGraphQLTypeResolvers };
