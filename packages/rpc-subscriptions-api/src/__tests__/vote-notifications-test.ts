import { type RpcSubscriptions } from '@trezoa/rpc-subscriptions-spec';

import type { VoteNotificationsApi } from '../vote-notifications';
import { createLocalhostTrezoaRpcSubscriptions } from './__setup__';

describe('voteNotifications', () => {
    let rpc: RpcSubscriptions<VoteNotificationsApi>;
    beforeEach(() => {
        rpc = createLocalhostTrezoaRpcSubscriptions();
    });

    it('produces vote notifications', async () => {
        expect.assertions(1);

        const abortController = new AbortController();
        try {
            const voteNotifications = await rpc.voteNotifications().subscribe({ abortSignal: abortController.signal });
            const iterator = voteNotifications[Symbol.asyncIterator]();
            await expect(iterator.next()).resolves.toHaveProperty(
                'value',
                expect.objectContaining({
                    hash: expect.any(String),
                    signature: expect.any(String),
                    slots: expect.arrayContaining([expect.any(BigInt)]),
                    // TODO: Test for null. It appears this is maybe non-deterministic? Seems to maybe occur on delayed votes?
                    timestamp: expect.any(BigInt),
                    votePubkey: expect.any(String),
                }),
            );
        } finally {
            abortController.abort();
        }
    });
});
