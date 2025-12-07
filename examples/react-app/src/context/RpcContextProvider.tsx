import { createTrezoaRpc, createTrezoaRpcSubscriptions } from '@trezoa/kit';
import { ReactNode, useContext, useMemo } from 'react';

import { ChainContext } from './ChainContext';
import { RpcContext } from './RpcContext';

type Props = Readonly<{
    children: ReactNode;
}>;

export function RpcContextProvider({ children }: Props) {
    const { trezoaRpcSubscriptionsUrl, trezoaRpcUrl } = useContext(ChainContext);
    return (
        <RpcContext.Provider
            value={useMemo(
                () => ({
                    rpc: createTrezoaRpc(trezoaRpcUrl),
                    rpcSubscriptions: createTrezoaRpcSubscriptions(trezoaRpcSubscriptionsUrl),
                }),
                [trezoaRpcSubscriptionsUrl, trezoaRpcUrl],
            )}
        >
            {children}
        </RpcContext.Provider>
    );
}
