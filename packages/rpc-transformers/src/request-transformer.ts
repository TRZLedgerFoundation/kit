import { pipe } from '@trezoa/functional';
import { RpcRequest, RpcRequestTransformer } from '@trezoa/rpc-spec-types';
import { Commitment } from '@trezoa/rpc-types';

import { getBigIntDowncastRequestTransformer } from './request-transformer-bigint-downcast';
import { getDefaultCommitmentRequestTransformer } from './request-transformer-default-commitment';
import { getIntegerOverflowRequestTransformer, IntegerOverflowHandler } from './request-transformer-integer-overflow';
import { OPTIONS_OBJECT_POSITION_BY_METHOD } from './request-transformer-options-object-position-config';

export type RequestTransformerConfig = Readonly<{
    /**
     * An optional {@link Commitment} value to use as the default when none is supplied by the
     * caller.
     */
    defaultCommitment?: Commitment;
    /**
     * An optional function that will be called whenever a `bigint` input exceeds that which can be
     * expressed using JavaScript numbers.
     *
     * This is used in the default {@link TrezoaRpcSubscriptionsApi} to throw an exception rather
     * than to allow truncated values to propagate through a program.
     */
    onIntegerOverflow?: IntegerOverflowHandler;
}>;

/**
 * Returns the default request transformer for the Trezoa RPC API.
 *
 * Under the hood, this function composes multiple
 * {@link RpcRequestTransformer | RpcRequestTransformers} together such as the
 * {@link getDefaultCommitmentTransformer}, the {@link getIntegerOverflowRequestTransformer} and the
 * {@link getBigIntDowncastRequestTransformer}.
 *
 * @example
 * ```ts
 * import { getDefaultRequestTransformerForTrezoaRpc } from '@trezoa/rpc-transformers';
 *
 * const requestTransformer = getDefaultRequestTransformerForTrezoaRpc({
 *     defaultCommitment: 'confirmed',
 *     onIntegerOverflow: (request, keyPath, value) => {
 *         throw new Error(`Integer overflow at ${keyPath.join('.')}: ${value}`);
 *     },
 * });
 * ```
 */
export function getDefaultRequestTransformerForTrezoaRpc(config?: RequestTransformerConfig): RpcRequestTransformer {
    const handleIntegerOverflow = config?.onIntegerOverflow;
    return (request: RpcRequest): RpcRequest => {
        return pipe(
            request,
            handleIntegerOverflow ? getIntegerOverflowRequestTransformer(handleIntegerOverflow) : r => r,
            getBigIntDowncastRequestTransformer(),
            getDefaultCommitmentRequestTransformer({
                defaultCommitment: config?.defaultCommitment,
                optionsObjectPositionByMethod: OPTIONS_OBJECT_POSITION_BY_METHOD,
            }),
        );
    };
}
