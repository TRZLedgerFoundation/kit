/* eslint-disable @typescript-eslint/no-floating-promises */
import type { Signature } from '@trezoa/keys';
import type { PendingRpcSubscriptionsRequest, RpcSubscriptions } from '@trezoa/rpc-subscriptions-spec';
import type { TrezoaRpcResponse, TransactionError } from '@trezoa/rpc-types';

import type { SignatureNotificationsApi } from '../signature-notifications';

const rpcSubscriptions = null as unknown as RpcSubscriptions<SignatureNotificationsApi>;

type TNotificationReceived = TrezoaRpcResponse<Readonly<string>>;
type TNotificationProcessed = TrezoaRpcResponse<
    Readonly<{
        err: TransactionError | null;
    }>
>;

rpcSubscriptions.signatureNotifications(
    'xxxxx' as Signature,
) satisfies PendingRpcSubscriptionsRequest<TNotificationProcessed>;
rpcSubscriptions
    .signatureNotifications('xxxxx' as Signature)
    .subscribe({ abortSignal: new AbortController().signal }) satisfies Promise<AsyncIterable<TNotificationProcessed>>;

rpcSubscriptions.signatureNotifications('xxxxx' as Signature, {
    commitment: 'confirmed',
}) satisfies PendingRpcSubscriptionsRequest<TNotificationProcessed>;
rpcSubscriptions
    .signatureNotifications('xxxxx' as Signature, { commitment: 'confirmed' })
    .subscribe({ abortSignal: new AbortController().signal }) satisfies Promise<AsyncIterable<TNotificationProcessed>>;

rpcSubscriptions.signatureNotifications('xxxxx' as Signature, {
    commitment: 'confirmed',
    enableReceivedNotification: false,
}) satisfies PendingRpcSubscriptionsRequest<TNotificationProcessed>;
rpcSubscriptions
    .signatureNotifications('xxxxx' as Signature, {
        commitment: 'confirmed',
        enableReceivedNotification: false,
    })
    .subscribe({ abortSignal: new AbortController().signal }) satisfies Promise<AsyncIterable<TNotificationProcessed>>;

rpcSubscriptions.signatureNotifications('xxxxx' as Signature, {
    commitment: 'confirmed',
    enableReceivedNotification: true,
}) satisfies PendingRpcSubscriptionsRequest<TNotificationProcessed | TNotificationReceived>;
rpcSubscriptions
    .signatureNotifications('xxxxx' as Signature, {
        commitment: 'confirmed',
        enableReceivedNotification: true,
    })
    .subscribe({ abortSignal: new AbortController().signal }) satisfies Promise<
    AsyncIterable<TNotificationProcessed | TNotificationReceived>
>;
rpcSubscriptions.signatureNotifications('xxxxx' as Signature, {
    commitment: 'confirmed',
    enableReceivedNotification: true,
    // @ts-expect-error Should have both notification types
}) satisfies PendingRpcSubscription<TNotificationProcessed>;
rpcSubscriptions
    .signatureNotifications('xxxxx' as Signature, {
        commitment: 'confirmed',
        enableReceivedNotification: true,
    })
    // @ts-expect-error Should have both notification types
    .subscribe({ abortSignal: new AbortController().signal }) satisfies Promise<AsyncIterable<TNotificationProcessed>>;

void (async () => {
    // [DESCRIBE] When `enableReceivedNotification` is true
    {
        // It is the literal string `'receivedSignature'` when the value is a string.
        const notifications = await rpcSubscriptions
            .signatureNotifications('xxxxx' as Signature, { enableReceivedNotification: true })
            .subscribe({ abortSignal: AbortSignal.any([]) });
        for await (const notif of notifications) {
            if (typeof notif.value === 'string') {
                notif.value satisfies 'receivedSignature';
            }
        }
    }
    {
        // It is an object with a nullable error property when the value is not a string.
        const notifications = await rpcSubscriptions
            .signatureNotifications('xxxxx' as Signature, { enableReceivedNotification: true })
            .subscribe({ abortSignal: AbortSignal.any([]) });
        for await (const notif of notifications) {
            if (typeof notif.value !== 'string') {
                notif.value.err satisfies TransactionError | null;
            }
        }
    }
});
