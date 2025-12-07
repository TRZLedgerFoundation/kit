import { TrezoaRpcApi, TrezoaRpcApiDevnet, TrezoaRpcApiMainnet, TrezoaRpcApiTestnet } from '..';

'getAccountInfo' satisfies keyof TrezoaRpcApi;
// @ts-expect-error RPC API does not have this method
'someMadeUpMethod' satisfies keyof TrezoaRpcApi;

// if we extend the RPC API with additional methods, we can access them on keyof
type TestRpcApi = TrezoaRpcApi & {
    someMadeUpMethod: () => void;
};
'someMadeUpMethod' satisfies keyof TestRpcApi;

// request airdrop is available on test networks, but not mainnet
'requestAirdrop' satisfies keyof TrezoaRpcApiDevnet;
'requestAirdrop' satisfies keyof TrezoaRpcApiTestnet;
'requestAirdrop' satisfies keyof TrezoaRpcApi;
// @ts-expect-error requestAirdrop is not available on mainnet
'requestAirdrop' satisfies keyof TrezoaRpcApiMainnet;
