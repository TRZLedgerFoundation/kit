/**
 * This package contains utilities for creating objects that you can use to communicate with a
 * Trezoa JSON RPC server. It can be used standalone, but it is also exported as part of Kit
 * [`@trezoa/kit`](https://github.com/trezoa-xyz/kit/tree/main/packages/kit).
 *
 * Unless you plan to create a custom RPC interface, you can use the
 * {@link createTrezoaRpc} function to obtain a default implementation of the
 * [Trezoa JSON RPC API](https://trezoa.com/docs/rpc/http).
 *
 * @packageDocumentation
 */
export * from '@trezoa/rpc-api';
export * from '@trezoa/rpc-spec';

export * from './rpc';
export * from './rpc-default-config';
export * from './rpc-clusters';
export * from './rpc-transport';
