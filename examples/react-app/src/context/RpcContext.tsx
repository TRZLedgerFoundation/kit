import type { Rpc, RpcSubscriptions, TrezoaRpcApiMainnet, TrezoaRpcSubscriptionsApi } from '@trezoa/kit';
import { createTrezoaRpc, createTrezoaRpcSubscriptions, devnet } from '@trezoa/kit';
import { createContext } from 'react';

export const RpcContext = createContext<{
    rpc: Rpc<TrezoaRpcApiMainnet>; // Limit the API to only those methods found on Mainnet (ie. not `requestAirdrop`)
    rpcSubscriptions: RpcSubscriptions<TrezoaRpcSubscriptionsApi>;
}>({
    rpc: createTrezoaRpc(devnet('https://api.devnet.trezoa.com')),
    rpcSubscriptions: createTrezoaRpcSubscriptions(devnet('wss://api.devnet.trezoa.com')),
});
