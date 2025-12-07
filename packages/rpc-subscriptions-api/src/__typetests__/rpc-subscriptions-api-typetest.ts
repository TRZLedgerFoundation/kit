import { TrezoaRpcSubscriptionsApi, TrezoaRpcSubscriptionsApiUnstable } from '..';

'accountNotifications' satisfies keyof TrezoaRpcSubscriptionsApi;
// @ts-expect-error RPC subscriptions API does not have this method
'someMadeUpNotifications' satisfies keyof TrezoaRpcSubscriptionsApi;

// if we extend the RPC API with additional methods, we can access them on keyof
type testRpcSubscriptionsApi = TrezoaRpcSubscriptionsApi & {
    someMadeUpNotifications: () => void;
};
'someMadeUpNotifications' satisfies keyof testRpcSubscriptionsApi;

// slots updates notifications are available on unstable API only
'slotsUpdatesNotifications' satisfies keyof TrezoaRpcSubscriptionsApiUnstable;
// @ts-expect-error RPC subscriptions API does not have this method
'slotsUpdatesNotifications' satisfies keyof TrezoaRpcSubscriptionsApi;

// vote notifications are available on unstable API only
'voteNotifications' satisfies keyof TrezoaRpcSubscriptionsApiUnstable;
// @ts-expect-error RPC subscriptions API does not have this method
'voteNotifications' satisfies keyof TrezoaRpcSubscriptionsApi;
