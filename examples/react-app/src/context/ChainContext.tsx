import type { ClusterUrl } from '@trezoa/kit';
import { devnet } from '@trezoa/kit';
import { createContext } from 'react';

export type ChainContext = Readonly<{
    chain: `trezoa:${string}`;
    displayName: string;
    setChain?(chain: `trezoa:${string}`): void;
    trezoaExplorerClusterName: 'devnet' | 'mainnet-beta' | 'testnet';
    trezoaRpcSubscriptionsUrl: ClusterUrl;
    trezoaRpcUrl: ClusterUrl;
}>;

export const DEFAULT_CHAIN_CONFIG = Object.freeze({
    chain: 'trezoa:devnet',
    displayName: 'Devnet',
    trezoaExplorerClusterName: 'devnet',
    trezoaRpcSubscriptionsUrl: devnet('wss://api.devnet.trezoa.com'),
    trezoaRpcUrl: devnet('https://api.devnet.trezoa.com'),
});

export const ChainContext = createContext<ChainContext>(DEFAULT_CHAIN_CONFIG);
