[![npm][npm-image]][npm-url]
[![npm-downloads][npm-downloads-image]][npm-url]
<br />
[![code-style-prettier][code-style-prettier-image]][code-style-prettier-url]

[code-style-prettier-image]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[code-style-prettier-url]: https://github.com/prettier/prettier
[npm-downloads-image]: https://img.shields.io/npm/dm/@trezoa/rpc-subscriptions-api?style=flat
[npm-image]: https://img.shields.io/npm/v/@trezoa/rpc-subscriptions-api?style=flat
[npm-url]: https://www.npmjs.com/package/@trezoa/rpc-subscriptions-api

# @trezoa/rpc-subscriptions-api

This package contains types that describe the [methods](https://trezoa.com/docs/rpc/websocket) of the Trezoa JSON RPC Subscriptions API, and utilities for creating a `RpcSubscriptionsApi` implementation with sensible defaults. It can be used standalone, but it is also exported as part of Kit [`@trezoa/kit`](https://github.com/trezoa-xyz/kit/tree/main/packages/kit).

Each RPC subscriptions method is described in terms of a TypeScript type of the following form:

```ts
type ExampleApi = {
    thingNotifications(address: Address): Thing;
};
```

A `RpcSubscriptionsApi` that implements `ExampleApi` will ultimately expose its defined methods on any `RpcSubscriptions` that uses it.

```ts
const rpcSubscriptions: RpcSubscriptions<ExampleApi> = createExampleRpcSubscriptions(/* ... */);
const thingNotifications = await rpc
    .thingNotifications(address('95DpK3y3GF7U8s1k4EvZ7xqyeCkhsHeZaE97iZpHUGMN'))
    .subscribe({ abortSignal: AbortSignal.timeout(5_000) });
try {
    for await (const thing of thingNotifications) {
        console.log('Got a thing', thing);
    }
} catch (e) {
    console.error('Our subscription to `Thing` notifications has failed', e);
} finally {
    console.log('We are done listening for `Thing` notifications');
}
```

## Types

### `TrezoaRpcSubscriptionsApi{Devnet|Testnet|Mainnet}`

These types represent the RPC subscription methods available on a specific Trezoa cluster.

## Functions

### `createTrezoaRpcSubscriptionsApi(config)`

Creates a `RpcSubscriptionsApi` implementation of the Trezoa JSON RPC Subscriptions API with some default behaviours.

The default behaviours include:

- A transform that converts `bigint` inputs to `number` for compatibility with version 1.0 of the Trezoa JSON RPC.
- A transform that calls the config's `onIntegerOverflow` handler whenever a `bigint` input would overflow a JavaScript IEEE 754 number. See [this](https://github.com/trezoa-team/trezoa-web3.js/issues/1116) GitHub issue for more information.
- A transform that applies a default commitment wherever not specified

#### Arguments

A config object with the following properties:

- `defaultCommitment`: An optional default `Commitment` value. Given an RPC method that takes `commitment` as a parameter, this value will be used when the caller does not supply one.
- `onIntegerOverflow(request, keyPath, value): void`: An optional function that will be called whenever a `bigint` input exceeds that which can be expressed using JavaScript numbers. This is used in the default `TrezoaRpcSubscriptionsApi` to throw an exception rather than to allow truncated values to propagate through a program.
