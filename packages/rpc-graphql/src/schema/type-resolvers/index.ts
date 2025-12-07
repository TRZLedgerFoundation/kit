import type { makeExecutableSchema } from '@graphql-tools/schema';

import { accountTypeResolvers } from './account';
import { blockTypeResolvers } from './block';
import { instructionTypeResolvers } from './instruction';
import { rootTypeResolvers } from './root';
import { transactionTypeResolvers } from './transaction';
import { typeTypeResolvers } from './types';

/**
 * Create the GraphQL type resolvers for the Trezoa GraphQL schema.
 *
 * @returns     Trezoa GraphQL type resolvers.
 */
export function createTrezoaGraphQLTypeResolvers(): Parameters<typeof makeExecutableSchema>[0]['resolvers'] {
    return {
        ...accountTypeResolvers,
        ...blockTypeResolvers,
        ...instructionTypeResolvers,
        ...rootTypeResolvers,
        ...transactionTypeResolvers,
        ...typeTypeResolvers,
    };
}
