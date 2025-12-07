[![npm][npm-image]][npm-url]
[![npm-downloads][npm-downloads-image]][npm-url]
<br />
[![code-style-prettier][code-style-prettier-image]][code-style-prettier-url]

[code-style-prettier-image]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[code-style-prettier-url]: https://github.com/prettier/prettier
[npm-downloads-image]: https://img.shields.io/npm/dm/@trezoa/rpc-transformers?style=flat
[npm-image]: https://img.shields.io/npm/v/@trezoa/rpc-transformers?style=flat
[npm-url]: https://www.npmjs.com/package/@trezoa/rpc-transformers

# @trezoa/rpc-transformers

This package contains helpers for transforming Trezoa JSON RPC and RPC Subscriptions requests, responses, and notifications in various ways appropriate for use in a JavaScript application.

## Request Transformers

### `getDefaultRequestTransformerForTrezoaRpc(config)`

Returns the default request transformer for the Trezoa RPC API. Under the hood, this function composes multiple `RpcRequestTransformers` together such as the `getDefaultCommitmentTransformer`, the `getIntegerOverflowRequestTransformer` and the `getBigIntDowncastRequestTransformer`.

```ts
import { getDefaultRequestTransformerForTrezoaRpc } from '@trezoa/rpc-transformers';

const requestTransformer = getDefaultRequestTransformerForTrezoaRpc({
    defaultCommitment: 'confirmed',
    onIntegerOverflow: (request, keyPath, value) => {
        throw new Error(`Integer overflow at ${keyPath.join('.')}: ${value}`);
    },
});
```

### `getDefaultCommitmentRequestTransformer(config)`

Creates a transformer that adds the provided default commitment to the configuration object of the request when applicable.

```ts
import { getDefaultCommitmentRequestTransformer, OPTIONS_OBJECT_POSITION_BY_METHOD } from '@trezoa/rpc-transformers';

const requestTransformer = getDefaultCommitmentRequestTransformer({
    defaultCommitment: 'confirmed',
    optionsObjectPositionByMethod: OPTIONS_OBJECT_POSITION_BY_METHOD,
});
```

### `getIntegerOverflowRequestTransformer(handler)`

Creates a transformer that traverses the request parameters and executes the provided handler when an integer overflow is detected.

```ts
import { getIntegerOverflowRequestTransformer } from '@trezoa/rpc-transformers';

const requestTransformer = getIntegerOverflowRequestTransformer((request, keyPath, value) => {
    throw new Error(`Integer overflow at ${keyPath.join('.')}: ${value}`);
});
```

### `getBigIntDowncastRequestTransformer()`

Creates a transformer that downcasts all `BigInt` values to `Number`.

```ts
import { getBigIntDowncastRequestTransformer } from '@trezoa/rpc-transformers';

const requestTransformer = getBigIntDowncastRequestTransformer();
```

### `getTreeWalkerRequestTransformer(visitors, initialState)`

Creates a transformer that traverses the request parameters and executes the provided visitors at each node. A custom initial state can be provided but must at least provide `{ keyPath: [] }`.

```ts
import { getTreeWalkerRequestTransformer } from '@trezoa/rpc-transformers';

const requestTransformer = getTreeWalkerRequestTransformer(
    [
        // Replaces foo.bar with "baz".
        (node, state) => (state.keyPath === ['foo', 'bar'] ? 'baz' : node),
        // Increments all numbers by 1.
        node => (typeof node === number ? node + 1 : node),
    ],
    { keyPath: [] },
);
```

## Response Transformers

### `getDefaultResponseTransformerForTrezoaRpc(config)`

Returns the default response transformer for the Trezoa RPC API. Under the hood, this function composes multiple `RpcResponseTransformers` together such as the `getThrowTrezoaErrorResponseTransformer`, the `getResultResponseTransformer` and the `getBigIntUpcastResponseTransformer`.

```ts
import { getDefaultResponseTransformerForTrezoaRpc } from '@trezoa/rpc-transformers';

const responseTransformer = getDefaultResponseTransformerForTrezoaRpc({
    allowedNumericKeyPaths: getAllowedNumericKeypaths(),
});
```

### `getThrowTrezoaErrorResponseTransformer()`

Returns a transformer that throws a `TrezoaError` with the appropriate RPC error code if the body of the RPC response contains an error.

```ts
import { getThrowTrezoaErrorResponseTransformer } from '@trezoa/rpc-transformers';

const responseTransformer = getThrowTrezoaErrorResponseTransformer();
```

### `getResultResponseTransformer()`

Returns a transformer that extracts the `result` field from the body of the RPC response. For instance, we go from `{ jsonrpc: '2.0', result: 'foo', id: 1 }` to `'foo'`.

```ts
import { getResultResponseTransformer } from '@trezoa/rpc-transformers';

const responseTransformer = getResultResponseTransformer();
```

### `getBigIntUpcastResponseTransformer(allowedNumericKeyPaths)`

Returns a transformer that upcasts all `Number` values to `BigInts` unless they match within the provided `KeyPaths`. In other words, the provided `KeyPaths` will remain as `Number` values, any other numeric value will be upcasted to a `BigInt`. Note that you can use `KEYPATH_WILDCARD` to match any key within a `KeyPath`.

```ts
import { getBigIntUpcastResponseTransformer } from '@trezoa/rpc-transformers';

const responseTransformer = getBigIntUpcastResponseTransformer([
    ['index'],
    ['instructions', KEYPATH_WILDCARD, 'accounts', KEYPATH_WILDCARD],
    ['instructions', KEYPATH_WILDCARD, 'programIdIndex'],
    ['instructions', KEYPATH_WILDCARD, 'stackHeight'],
]);
```

### `getTreeWalkerResponseTransformer(visitors, initialState)`

Creates a transformer that traverses the json response and executes the provided visitors at each node. A custom initial state can be provided but must at least provide `{ keyPath: [] }`.

```ts
import { getTreeWalkerResponseTransformer } from '@trezoa/rpc-transformers';

const responseTransformer = getTreeWalkerResponseTransformer(
    [
        // Replaces foo.bar with "baz".
        (node, state) => (state.keyPath === ['foo', 'bar'] ? 'baz' : node),
        // Increments all numbers by 1.
        node => (typeof node === number ? node + 1 : node),
    ],
    { keyPath: [] },
);
```
