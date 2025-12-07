import { TREZOA_ERROR__RPC_SUBSCRIPTIONS__CANNOT_CREATE_SUBSCRIPTION_PLAN, TrezoaError } from '@trezoa/errors';

import { createSubscriptionRpc, type RpcSubscriptions } from '../rpc-subscriptions';

interface TestRpcSubscriptionNotifications {
    thingNotifications(...args: unknown[]): unknown;
}

describe('createSubscriptionRpc', () => {
    let rpcSubscriptions: RpcSubscriptions<TestRpcSubscriptionNotifications>;

    beforeEach(() => {
        rpcSubscriptions = createSubscriptionRpc<TestRpcSubscriptionNotifications>({
            // @ts-expect-error Does not implement API on purpose
            api: {},
            transport: jest.fn(),
        });
    });

    it('throws when the API produces no subscription plan', () => {
        expect(() => {
            rpcSubscriptions.thingNotifications();
        }).toThrow(
            new TrezoaError(TREZOA_ERROR__RPC_SUBSCRIPTIONS__CANNOT_CREATE_SUBSCRIPTION_PLAN, {
                notificationName: 'thingNotifications',
            }),
        );
    });

    it('should not be thenable', () => {
        expect(rpcSubscriptions).not.toHaveProperty('then');
    });
});
