import { pipe } from '@trezoa/functional';
import {
    RpcSubscriptionsChannel,
    transformChannelInboundMessages,
    transformChannelOutboundMessages,
} from '@trezoa/rpc-subscriptions-spec';

/**
 * Given a {@link RpcSubscriptionsChannel}, will return a new channel that parses data published to
 * the `'message'` channel as JSON, and JSON-stringifies messages sent via the
 * {@link RpcSubscriptionsChannel.send | send(message)} method.
 */
export function getRpcSubscriptionsChannelWithJSONSerialization(
    channel: RpcSubscriptionsChannel<string, string>,
): RpcSubscriptionsChannel<unknown, unknown> {
    return pipe(
        channel,
        c => transformChannelInboundMessages(c, JSON.parse),
        c => transformChannelOutboundMessages(c, JSON.stringify),
    );
}
