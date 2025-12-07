import type { Slot } from '@trezoa/rpc-types';

type RootNotificationsApiNotification = Slot;

export type RootNotificationsApi = {
    /**
     * Subscribe to receive notifications anytime a new root is set by the validator.
     *
     * @returns The number of the rooted slot
     * @see https://trezoa.com/docs/rpc/websocket/rootsubscribe
     */
    rootNotifications(): RootNotificationsApiNotification;
};
