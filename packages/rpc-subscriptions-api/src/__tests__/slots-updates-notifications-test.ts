import { type RpcSubscriptions } from '@trezoa/rpc-subscriptions-spec';

import type { SlotsUpdatesNotificationsApi } from '../slots-updates-notifications';
import { createLocalhostTrezoaRpcSubscriptions } from './__setup__';

describe('slotsUpdatesNotifications', () => {
    let rpc: RpcSubscriptions<SlotsUpdatesNotificationsApi>;
    beforeEach(() => {
        rpc = createLocalhostTrezoaRpcSubscriptions();
    });

    it('produces slots updates notifications', async () => {
        expect.assertions(1);
        const abortController = new AbortController();
        try {
            const slotsUpdatesNotifications = await rpc
                .slotsUpdatesNotifications()
                .subscribe({ abortSignal: abortController.signal });
            const iterator = slotsUpdatesNotifications[Symbol.asyncIterator]();
            await expect(iterator.next()).resolves.toHaveProperty(
                'value',
                expect.objectContaining({
                    slot: expect.any(BigInt),
                    timestamp: expect.any(BigInt),
                    type: expect.any(String),
                }),
            );
        } finally {
            abortController.abort();
        }
    });
});
