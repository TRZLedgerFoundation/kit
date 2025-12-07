/**
 * This package contains types that implement RPC subscriptions as required by the Trezoa RPC.
 * Additionally, it incorporates some useful defaults that make working with subscriptions easier,
 * more performant, and more reliable. It can be used standalone, but it is also exported as part of
 * Kit [`@trezoa/kit`](https://github.com/trezoa-xyz/kit/tree/main/packages/kit).
 *
 * @packageDocumentation
 */
export * from '@trezoa/rpc-subscriptions-api';
export * from '@trezoa/rpc-subscriptions-spec';

export * from './rpc-default-config';
export * from './rpc-subscriptions-autopinger';
export * from './rpc-subscriptions-channel-pool';
export * from './rpc-subscriptions-channel';
export * from './rpc-subscriptions-clusters';
export * from './rpc-subscriptions-coalescer';
export * from './rpc-subscriptions-json-bigint';
export * from './rpc-subscriptions-json';
export * from './rpc-subscriptions-transport';
export * from './rpc-subscriptions';
