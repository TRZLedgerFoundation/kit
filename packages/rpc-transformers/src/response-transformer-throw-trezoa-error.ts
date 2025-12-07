import { getTrezoaErrorFromJsonRpcError } from '@trezoa/errors';
import { RpcResponseTransformer } from '@trezoa/rpc-spec-types';

type JsonRpcResponse = { error: Parameters<typeof getTrezoaErrorFromJsonRpcError>[0] } | { result: unknown };

/**
 * Returns a transformer that throws a {@link TrezoaError} with the appropriate RPC error code if
 * the body of the RPC response contains an error.
 *
 * @example
 * ```ts
 * import { getThrowTrezoaErrorResponseTransformer } from '@trezoa/rpc-transformers';
 *
 * const responseTransformer = getThrowTrezoaErrorResponseTransformer();
 * ```
 */
export function getThrowTrezoaErrorResponseTransformer(): RpcResponseTransformer {
    return json => {
        const jsonRpcResponse = json as JsonRpcResponse;
        if ('error' in jsonRpcResponse) {
            throw getTrezoaErrorFromJsonRpcError(jsonRpcResponse.error);
        }
        return jsonRpcResponse;
    };
}
