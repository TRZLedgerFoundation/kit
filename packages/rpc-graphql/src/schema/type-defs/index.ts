import { accountTypeDefs } from './account';
import { blockTypeDefs } from './block';
import { instructionTypeDefs } from './instruction';
import { rootTypeDefs } from './root';
import { transactionTypeDefs } from './transaction';
import { typeTypeDefs } from './types';

/**
 * Creates the GraphQL type definitions for the Trezoa GraphQL schema.
 *
 * @returns     Trezoa GraphQL type definitions.
 */
export function createTrezoaGraphQLTypeDefs() {
    return [accountTypeDefs, blockTypeDefs, instructionTypeDefs, rootTypeDefs, typeTypeDefs, transactionTypeDefs];
}
