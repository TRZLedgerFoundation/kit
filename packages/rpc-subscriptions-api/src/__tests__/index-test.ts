import { executeRpcPubSubSubscriptionPlan, type RpcSubscriptionsApi } from '@trezoa/rpc-subscriptions-spec';

import { createTrezoaRpcSubscriptionsApi } from '../index';

type TestRpcSubscriptionNotifications = {
    thingNotifications(...args: unknown[]): unknown;
};

jest.mock('@trezoa/rpc-subscriptions-spec', () => ({
    ...jest.requireActual('@trezoa/rpc-subscriptions-spec'),
    executeRpcPubSubSubscriptionPlan: jest.fn().mockReturnValue(
        new Promise(() => {
            /* never resolves */
        }),
    ),
}));

describe('createTrezoaRpcSubscriptionsApi', () => {
    let api: RpcSubscriptionsApi<TestRpcSubscriptionNotifications>;
    beforeEach(() => {
        api = createTrezoaRpcSubscriptionsApi();
    });
    it('creates a subscription plan that synthesizes the correct subscribe/unsubscribe method names from the name of the notification', () => {
        const { execute } = api.thingNotifications();
        void execute({
            channel: {
                on: jest.fn(),
                send: jest.fn(),
            },
            signal: new AbortController().signal,
        });
        expect(executeRpcPubSubSubscriptionPlan).toHaveBeenCalledWith(
            expect.objectContaining({
                subscribeRequest: { methodName: 'thingSubscribe', params: [] },
                unsubscribeMethodName: 'thingUnsubscribe',
            }),
        );
    });
});
