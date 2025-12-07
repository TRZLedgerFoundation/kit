import { pipe } from '@trezoa/functional';
import { RpcRequest, RpcResponse, RpcResponseTransformer } from '@trezoa/rpc-spec-types';

import { AllowedNumericKeypaths } from './response-transformer-allowed-numeric-values';
import { getBigIntUpcastResponseTransformer } from './response-transformer-bigint-upcast';
import { getResultResponseTransformer } from './response-transformer-result';
import { getThrowTrezoaErrorResponseTransformer } from './response-transformer-throw-solana-error';

export type ResponseTransformerConfig<TApi> = Readonly<{
    /**
     * An optional map from the name of an API method to an array of {@link KeyPath | KeyPaths}
     * pointing to values in the response that should materialize in the application as `Number`
     * instead of `BigInt`.
     */
    allowedNumericKeyPaths?: AllowedNumericKeypaths<TApi>;
}>;

/**
 * Returns the default response transformer for the Trezoa RPC API.
 *
 * Under the hood, this function composes multiple
 * {@link RpcResponseTransformer | RpcResponseTransformers} together such as the
 * {@link getThrowTrezoaErrorResponseTransformer}, the {@link getResultResponseTransformer} and the
 * {@link getBigIntUpcastResponseTransformer}.
 *
 * @example
 * ```ts
 * import { getDefaultResponseTransformerForTrezoaRpc } from '@trezoa/rpc-transformers';
 *
 * const responseTransformer = getDefaultResponseTransformerForTrezoaRpc({
 *     allowedNumericKeyPaths: getAllowedNumericKeypaths(),
 * });
 * ```
 */
export function getDefaultResponseTransformerForTrezoaRpc<TApi>(
    config?: ResponseTransformerConfig<TApi>,
): RpcResponseTransformer {
    return (response: RpcResponse, request: RpcRequest): RpcResponse => {
        const methodName = request.methodName as keyof TApi;
        const keyPaths =
            config?.allowedNumericKeyPaths && methodName ? config.allowedNumericKeyPaths[methodName] : undefined;
        return pipe(
            response,
            r => getThrowTrezoaErrorResponseTransformer()(r, request),
            r => getResultResponseTransformer()(r, request),
            r => getBigIntUpcastResponseTransformer(keyPaths ?? [])(r, request),
        );
    };
}

/**
 * Returns the default response transformer for the Trezoa RPC Subscriptions API.
 *
 * Under the hood, this function composes the {@link getBigIntUpcastResponseTransformer}.
 *
 * @example
 * ```ts
 * import { getDefaultResponseTransformerForTrezoaRpcSubscriptions } from '@trezoa/rpc-transformers';
 *
 * const responseTransformer = getDefaultResponseTransformerForTrezoaRpcSubscriptions({
 *     allowedNumericKeyPaths: getAllowedNumericKeypaths(),
 * });
 * ```
 */
export function getDefaultResponseTransformerForTrezoaRpcSubscriptions<TApi>(
    config?: ResponseTransformerConfig<TApi>,
): RpcResponseTransformer {
    return (response: RpcResponse, request: RpcRequest): RpcResponse => {
        const methodName = request.methodName as keyof TApi;
        const keyPaths =
            config?.allowedNumericKeyPaths && methodName ? config.allowedNumericKeyPaths[methodName] : undefined;
        return pipe(response, r => getBigIntUpcastResponseTransformer(keyPaths ?? [])(r, request));
    };
}
