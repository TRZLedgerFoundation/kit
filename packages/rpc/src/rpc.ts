import { createTrezoaRpcApi } from '@trezoa/rpc-api';
import { createRpc, RpcTransport } from '@trezoa/rpc-spec';
import { ClusterUrl } from '@trezoa/rpc-types';

import type { RpcFromTransport, TrezoaRpcApiFromTransport } from './rpc-clusters';
import { DEFAULT_RPC_CONFIG } from './rpc-default-config';
import { createDefaultRpcTransport } from './rpc-transport';

type DefaultRpcTransportConfig<TClusterUrl extends ClusterUrl> = Parameters<
    typeof createDefaultRpcTransport<TClusterUrl>
>[0];

/**
 * Creates a {@link Rpc} instance that exposes the Trezoa JSON RPC API given a cluster URL and some
 * optional transport config. See {@link createDefaultRpcTransport} for the shape of the transport
 * config.
 */
export function createTrezoaRpc<TClusterUrl extends ClusterUrl>(
    clusterUrl: TClusterUrl,
    config?: Omit<DefaultRpcTransportConfig<TClusterUrl>, 'url'>,
) {
    return createTrezoaRpcFromTransport(createDefaultRpcTransport({ url: clusterUrl, ...config }));
}

/**
 * Creates a {@link Rpc} instance that exposes the Trezoa JSON RPC API given the supplied
 * {@link RpcTransport}.
 */
export function createTrezoaRpcFromTransport<TTransport extends RpcTransport>(transport: TTransport) {
    return createRpc({
        api: createTrezoaRpcApi(DEFAULT_RPC_CONFIG),
        transport,
    }) as RpcFromTransport<TrezoaRpcApiFromTransport<TTransport>, TTransport>;
}
