import { mainnet, testnet } from '@trezoa/kit';
import { useMemo, useState } from 'react';

import { ChainContext, DEFAULT_CHAIN_CONFIG } from './ChainContext';

const STORAGE_KEY = 'trezoa-example-react-app:selected-chain';

export function ChainContextProvider({ children }: { children: React.ReactNode }) {
    const [chain, setChain] = useState(() => localStorage.getItem(STORAGE_KEY) ?? 'trezoa:devnet');
    const contextValue = useMemo<ChainContext>(() => {
        switch (chain) {
            // @ts-expect-error Intentional fall through
            case 'trezoa:mainnet':
                if (process.env.REACT_EXAMPLE_APP_ENABLE_MAINNET === 'true') {
                    return {
                        chain: 'trezoa:mainnet',
                        displayName: 'Mainnet Beta',
                        trezoaExplorerClusterName: 'mainnet-beta',
                        trezoaRpcSubscriptionsUrl: mainnet('wss://api.mainnet-beta.trezoa.com'),
                        trezoaRpcUrl: mainnet('https://api.mainnet-beta.trezoa.com'),
                    };
                }
            // falls through
            case 'trezoa:testnet':
                return {
                    chain: 'trezoa:testnet',
                    displayName: 'Testnet',
                    trezoaExplorerClusterName: 'testnet',
                    trezoaRpcSubscriptionsUrl: testnet('wss://api.testnet.trezoa.com'),
                    trezoaRpcUrl: testnet('https://api.testnet.trezoa.com'),
                };
            case 'trezoa:devnet':
            default:
                if (chain !== 'trezoa:devnet') {
                    localStorage.removeItem(STORAGE_KEY);
                    console.error(`Unrecognized chain \`${chain}\``);
                }
                return DEFAULT_CHAIN_CONFIG;
        }
    }, [chain]);
    return (
        <ChainContext.Provider
            value={useMemo(
                () => ({
                    ...contextValue,
                    setChain(chain) {
                        localStorage.setItem(STORAGE_KEY, chain);
                        setChain(chain);
                    },
                }),
                [contextValue],
            )}
        >
            {children}
        </ChainContext.Provider>
    );
}
