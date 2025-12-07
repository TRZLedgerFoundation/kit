import type { createTrezoaRpcSubscriptionsApi } from '@trezoa/rpc-subscriptions-api';

import { createTrezoaJsonRpcIntegerOverflowError } from './rpc-integer-overflow-error';

export const DEFAULT_RPC_SUBSCRIPTIONS_CONFIG: Partial<
    NonNullable<Parameters<typeof createTrezoaRpcSubscriptionsApi>[0]>
> = {
    defaultCommitment: 'confirmed',
    onIntegerOverflow(request, keyPath, value) {
        throw createTrezoaJsonRpcIntegerOverflowError(request.methodName, keyPath, value);
    },
};
