/**
 * This is the JavaScript SDK for building Trezoa apps for Node, web, and React Native.
 *
 * In addition to re-exporting functions from packages in the `@trezoa/*` namespace, this package
 * offers additional helpers for building Trezoa applications, with sensible defaults.
 *
 * @packageDocumentation
 */
export * from '@trezoa/accounts';
export * from '@trezoa/addresses';
export * from '@trezoa/codecs';
export * from '@trezoa/errors';
export * from '@trezoa/functional';
export * from '@trezoa/instructions';
export * from '@trezoa/instruction-plans';
export * from '@trezoa/keys';
export * from '@trezoa/offchain-messages';
export * from '@trezoa/programs';
export * from '@trezoa/rpc';
export * from '@trezoa/rpc-parsed-types';
export * from '@trezoa/rpc-subscriptions';
export * from '@trezoa/rpc-types';
export * from '@trezoa/signers';
export * from '@trezoa/transaction-messages';
export * from '@trezoa/transactions';
export * from './airdrop';
export * from './decompile-transaction-message-fetching-lookup-tables';
export * from './fetch-lookup-tables';
export * from './send-and-confirm-durable-nonce-transaction';
export * from './send-and-confirm-transaction';
export * from './send-transaction-without-confirming';

export type {
    RpcRequest,
    RpcRequestTransformer,
    RpcResponse,
    RpcResponseData,
    RpcResponseTransformer,
} from '@trezoa/rpc-spec-types';
export { createRpcMessage } from '@trezoa/rpc-spec-types';
