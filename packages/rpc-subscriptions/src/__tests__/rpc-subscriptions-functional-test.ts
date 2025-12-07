import { Address } from '@trezoa/addresses';
import { AccountNotificationsApi, TrezoaRpcSubscriptionsApi } from '@trezoa/rpc-subscriptions-api';
import { createSubscriptionRpc, RpcSubscriptions } from '@trezoa/rpc-subscriptions-spec';

import {
    createDefaultRpcSubscriptionsTransport,
    createDefaultTrezoaRpcSubscriptionsChannelCreator,
    createTrezoaRpcSubscriptionsApi,
} from '..';

function createLocalhostTrezoaRpcSubscriptions(): RpcSubscriptions<TrezoaRpcSubscriptionsApi> {
    return createSubscriptionRpc({
        api: createTrezoaRpcSubscriptionsApi(),
        transport: createDefaultRpcSubscriptionsTransport({
            createChannel: createDefaultTrezoaRpcSubscriptionsChannelCreator({ url: 'ws://localhost:8900' }),
        }),
    });
}

describe('accountNotifications', () => {
    let rpcSubscriptions: RpcSubscriptions<AccountNotificationsApi>;
    beforeEach(() => {
        rpcSubscriptions = createLocalhostTrezoaRpcSubscriptions();
    });

    it('can subscribe to account notifications', async () => {
        expect.hasAssertions();
        const abortController = new AbortController();
        try {
            const subscriptionPromise = rpcSubscriptions
                .accountNotifications('4nTLDQiSTRHbngKZWPMfYnZdWTbKiNeuuPcX7yFUpSAc' as Address)
                .subscribe({ abortSignal: abortController.signal });

            await expect(subscriptionPromise).resolves.toEqual(
                expect.objectContaining({
                    [Symbol.asyncIterator]: expect.any(Function),
                }),
            );
        } finally {
            abortController.abort();
        }
    });
});
