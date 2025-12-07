import type { createTrezoaRpcApi } from '@trezoa/rpc-api';

import { createTrezoaJsonRpcIntegerOverflowError } from './rpc-integer-overflow-error';

/**
 * When you create {@link Rpc} instances with custom transports but otherwise the default RPC API
 * behaviours, use this.
 *
 * @example
 * ```ts
 * const myCustomRpc = createRpc({
 *     api: createTrezoaRpcApi(DEFAULT_RPC_CONFIG),
 *     transport: myCustomTransport,
 * });
 * ```
 */
export const DEFAULT_RPC_CONFIG: Partial<NonNullable<Parameters<typeof createTrezoaRpcApi>[0]>> = {
    defaultCommitment: 'confirmed',
    onIntegerOverflow(request, keyPath, value) {
        throw createTrezoaJsonRpcIntegerOverflowError(request.methodName, keyPath, value);
    },
};
