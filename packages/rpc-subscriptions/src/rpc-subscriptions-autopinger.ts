import { isTrezoaError, TREZOA_ERROR__RPC_SUBSCRIPTIONS__CHANNEL_CONNECTION_CLOSED } from '@trezoa/errors';
import { AbortController } from '@trezoa/event-target-impl';
import type { RpcSubscriptionsChannel } from '@trezoa/rpc-subscriptions-spec';

type Config<TChannel extends RpcSubscriptionsChannel<unknown, unknown>> = Readonly<{
    abortSignal: AbortSignal;
    channel: TChannel;
    intervalMs: number;
}>;

const PING_PAYLOAD = {
    jsonrpc: '2.0',
    method: 'ping',
} as const;

/**
 * Given a {@link RpcSubscriptionsChannel}, will return a new channel that sends a ping message to
 * the inner channel if a message has not been sent or received in the last `intervalMs`. In web
 * browsers, this implementation sends no ping when the network is down, and sends a ping
 * immediately upon the network coming back up.
 */
export function getRpcSubscriptionsChannelWithAutoping<TChannel extends RpcSubscriptionsChannel<object, unknown>>({
    abortSignal: callerAbortSignal,
    channel,
    intervalMs,
}: Config<TChannel>): TChannel {
    let intervalId: ReturnType<typeof setInterval> | undefined;
    function sendPing() {
        channel.send(PING_PAYLOAD).catch((e: unknown) => {
            if (isTrezoaError(e, TREZOA_ERROR__RPC_SUBSCRIPTIONS__CHANNEL_CONNECTION_CLOSED)) {
                pingerAbortController.abort();
            }
        });
    }
    function restartPingTimer() {
        clearInterval(intervalId);
        intervalId = setInterval(sendPing, intervalMs);
    }
    const pingerAbortController = new AbortController();
    pingerAbortController.signal.addEventListener('abort', () => {
        clearInterval(intervalId);
    });
    callerAbortSignal.addEventListener('abort', () => {
        pingerAbortController.abort();
    });
    channel.on(
        'error',
        () => {
            pingerAbortController.abort();
        },
        { signal: pingerAbortController.signal },
    );
    channel.on('message', restartPingTimer, { signal: pingerAbortController.signal });
    if (!__BROWSER__ || globalThis.navigator.onLine) {
        restartPingTimer();
    }
    if (__BROWSER__) {
        globalThis.addEventListener(
            'offline',
            function handleOffline() {
                clearInterval(intervalId);
            },
            { signal: pingerAbortController.signal },
        );
        globalThis.addEventListener(
            'online',
            function handleOnline() {
                sendPing();
                restartPingTimer();
            },
            { signal: pingerAbortController.signal },
        );
    }
    return {
        ...channel,
        send(...args) {
            if (!pingerAbortController.signal.aborted) {
                restartPingTimer();
            }
            return channel.send(...args);
        },
    };
}
