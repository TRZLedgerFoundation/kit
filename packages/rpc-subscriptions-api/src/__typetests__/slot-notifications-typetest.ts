import type { RpcSubscriptions } from '@trezoa/rpc-subscriptions-spec';
import type { Slot } from '@trezoa/rpc-types';

import type { SlotNotificationsApi } from '../slot-notifications';

void (async () => {
    const rpcSubcriptions = null as unknown as RpcSubscriptions<SlotNotificationsApi>;
    const slotNotifications = await rpcSubcriptions
        .slotNotifications()
        .subscribe({ abortSignal: new AbortController().signal });

    slotNotifications satisfies AsyncIterable<
        Readonly<{
            parent: Slot;
            root: Slot;
            slot: Slot;
        }>
    >;

    // @ts-expect-error Takes no params.
    rpcSubscriptions.slotNotifications({ commitment: 'finalized' });
});
