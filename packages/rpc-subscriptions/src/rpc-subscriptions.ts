import type { TrezoaRpcSubscriptionsApi, TrezoaRpcSubscriptionsApiUnstable } from '@trezoa/rpc-subscriptions-api';
import { createTrezoaRpcSubscriptionsApi } from '@trezoa/rpc-subscriptions-api';
import {
    createSubscriptionRpc,
    RpcSubscriptionsApiMethods,
    type RpcSubscriptionsTransport,
} from '@trezoa/rpc-subscriptions-spec';
import { ClusterUrl } from '@trezoa/rpc-types';

import { DEFAULT_RPC_SUBSCRIPTIONS_CONFIG } from './rpc-default-config';
import {
    createDefaultTrezoaRpcSubscriptionsChannelCreator,
    DefaultRpcSubscriptionsChannelConfig,
} from './rpc-subscriptions-channel';
import type { RpcSubscriptionsFromTransport } from './rpc-subscriptions-clusters';
import { createDefaultRpcSubscriptionsTransport } from './rpc-subscriptions-transport';

type Config<TClusterUrl extends ClusterUrl> = DefaultRpcSubscriptionsChannelConfig<TClusterUrl>;

function createTrezoaRpcSubscriptionsImpl<TClusterUrl extends ClusterUrl, TApi extends RpcSubscriptionsApiMethods>(
    clusterUrl: TClusterUrl,
    config?: Omit<Config<TClusterUrl>, 'url'>,
) {
    const transport = createDefaultRpcSubscriptionsTransport({
        createChannel: createDefaultTrezoaRpcSubscriptionsChannelCreator({ ...config, url: clusterUrl }),
    });
    return createTrezoaRpcSubscriptionsFromTransport<typeof transport, TApi>(transport);
}

/**
 * Creates a {@link RpcSubscriptions} instance that exposes the Trezoa JSON RPC WebSocket API given
 * a cluster URL and some optional channel config. See
 * {@link createDefaultRpcSubscriptionsChannelCreator} for the shape of the channel config.
 */
export function createTrezoaRpcSubscriptions<TClusterUrl extends ClusterUrl>(
    clusterUrl: TClusterUrl,
    config?: Omit<Config<TClusterUrl>, 'url'>,
) {
    return createTrezoaRpcSubscriptionsImpl<TClusterUrl, TrezoaRpcSubscriptionsApi>(clusterUrl, config);
}

/**
 * Creates a {@link RpcSubscriptions} instance that exposes the Trezoa JSON RPC WebSocket API,
 * including its unstable methods, given a cluster URL and some optional channel config. See
 * {@link createDefaultRpcSubscriptionsChannelCreator} for the shape of the channel config.
 */
export function createTrezoaRpcSubscriptions_UNSTABLE<TClusterUrl extends ClusterUrl>(
    clusterUrl: TClusterUrl,
    config?: Omit<Config<TClusterUrl>, 'url'>,
) {
    return createTrezoaRpcSubscriptionsImpl<TClusterUrl, TrezoaRpcSubscriptionsApi & TrezoaRpcSubscriptionsApiUnstable>(
        clusterUrl,
        config,
    );
}

/**
 * Creates a {@link RpcSubscriptions} instance that exposes the Trezoa JSON RPC WebSocket API given
 * the supplied {@link RpcSubscriptionsTransport}.
 */
export function createTrezoaRpcSubscriptionsFromTransport<
    TTransport extends RpcSubscriptionsTransport,
    TApi extends RpcSubscriptionsApiMethods = TrezoaRpcSubscriptionsApi,
>(transport: TTransport) {
    return createSubscriptionRpc({
        api: createTrezoaRpcSubscriptionsApi<TApi>(DEFAULT_RPC_SUBSCRIPTIONS_CONFIG),
        transport,
    }) as RpcSubscriptionsFromTransport<TApi, TTransport>;
}
