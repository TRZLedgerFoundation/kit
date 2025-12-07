import type { TrezoaRpcApi, TrezoaRpcApiDevnet, TrezoaRpcApiMainnet, TrezoaRpcApiTestnet } from '@trezoa/rpc-api';
import type { Rpc, RpcTransport } from '@trezoa/rpc-spec';
import { ClusterUrl, devnet, DevnetUrl, mainnet, MainnetUrl, testnet, TestnetUrl } from '@trezoa/rpc-types';

import { createTrezoaRpc, createTrezoaRpcFromTransport } from '../rpc';
import type {
    RpcDevnet,
    RpcMainnet,
    RpcTestnet,
    RpcTransportDevnet,
    RpcTransportMainnet,
    RpcTransportTestnet,
    TrezoaRpcApiFromClusterUrl,
} from '../rpc-clusters';
import { createDefaultRpcTransport } from '../rpc-transport';

// Define cluster-aware URLs and transports.

const genericUrl = 'http://localhost:8899';
const devnetUrl = devnet('https://api.devnet.trezoa.com');
const testnetUrl = testnet('https://api.testnet.trezoa.com');
const mainnetUrl = mainnet('https://api.mainnet-beta.trezoa.com');

const genericTransport = createDefaultRpcTransport({ url: genericUrl });
const devnetTransport = createDefaultRpcTransport({ url: devnetUrl });
const testnetTransport = createDefaultRpcTransport({ url: testnetUrl });
const mainnetTransport = createDefaultRpcTransport({ url: mainnetUrl });

// [DESCRIBE] createDefaultRpcTransport.
{
    // No cluster specified should be generic `RpcTransport`.
    {
        genericTransport satisfies RpcTransport;
        //@ts-expect-error Should not be a devnet transport
        genericTransport satisfies RpcTransportDevnet;
        //@ts-expect-error Should not be a testnet transport
        genericTransport satisfies RpcTransportTestnet;
        //@ts-expect-error Should not be a mainnet transport
        genericTransport satisfies RpcTransportMainnet;
    }

    // Devnet cluster should be `RpcTransportDevnet`.
    {
        devnetTransport satisfies RpcTransportDevnet;
        //@ts-expect-error Should not be a testnet transport
        devnetTransport satisfies RpcTransportTestnet;
        //@ts-expect-error Should not be a mainnet transport
        devnetTransport satisfies RpcTransportMainnet;
    }

    // Testnet cluster should be `RpcTransportTestnet`.
    {
        testnetTransport satisfies RpcTransportTestnet;
        //@ts-expect-error Should not be a devnet transport
        testnetTransport satisfies RpcTransportDevnet;
        //@ts-expect-error Should not be a mainnet transport
        testnetTransport satisfies RpcTransportMainnet;
    }

    // Mainnet cluster should be `RpcTransportMainnet`.
    {
        mainnetTransport satisfies RpcTransportMainnet;
        //@ts-expect-error Should not be a devnet transport
        mainnetTransport satisfies RpcTransportDevnet;
        //@ts-expect-error Should not be a testnet transport
        mainnetTransport satisfies RpcTransportTestnet;
    }
}

// [DESCRIBE] createTrezoaRpcFromTransport.
{
    const genericRpc = createTrezoaRpcFromTransport(genericTransport);
    const devnetRpc = createTrezoaRpcFromTransport(devnetTransport);
    const testnetRpc = createTrezoaRpcFromTransport(testnetTransport);
    const mainnetRpc = createTrezoaRpcFromTransport(mainnetTransport);

    // No cluster specified should be generic `Rpc`.
    {
        genericRpc satisfies Rpc<TrezoaRpcApi>;
        //@ts-expect-error Should not be a devnet RPC
        genericRpc satisfies RpcDevnet<TrezoaRpcApi>;
        //@ts-expect-error Should not be a testnet RPC
        genericRpc satisfies RpcTestnet<TrezoaRpcApi>;
        //@ts-expect-error Should not be a mainnet RPC
        genericRpc satisfies RpcMainnet<TrezoaRpcApi>;
    }

    // Devnet cluster should be `RpcDevnet`.
    {
        devnetRpc satisfies Rpc<TrezoaRpcApi>;
        devnetRpc satisfies Rpc<TrezoaRpcApiDevnet>;
        devnetRpc satisfies RpcDevnet<TrezoaRpcApi>;
        devnetRpc satisfies RpcDevnet<TrezoaRpcApiDevnet>; // Same types
        //@ts-expect-error Should not be a testnet RPC
        devnetRpc satisfies RpcTestnet<TrezoaRpcApi>;
        //@ts-expect-error Should not be a mainnet RPC
        devnetRpc satisfies RpcMainnet<TrezoaRpcApi>;
    }

    // Testnet cluster should be `RpcTestnet`.
    {
        testnetRpc satisfies Rpc<TrezoaRpcApi>;
        testnetRpc satisfies Rpc<TrezoaRpcApiTestnet>;
        testnetRpc satisfies RpcTestnet<TrezoaRpcApi>;
        testnetRpc satisfies RpcTestnet<TrezoaRpcApiTestnet>; // Same types
        //@ts-expect-error Should not be a devnet RPC
        testnetRpc satisfies RpcDevnet<TrezoaRpcApi>;
        //@ts-expect-error Should not be a mainnet RPC
        testnetRpc satisfies RpcMainnet<TrezoaRpcApi>;
    }

    // Mainnet cluster should be `RpcMainnet`.
    {
        mainnetRpc satisfies Rpc<TrezoaRpcApiMainnet>;
        mainnetRpc satisfies RpcMainnet<TrezoaRpcApiMainnet>;
        //@ts-expect-error Should not have `requestAirdrop` method
        mainnetRpc satisfies Rpc<RequestAirdropApi>;
        //@ts-expect-error Should not be a devnet RPC
        mainnetRpc satisfies RpcDevnet<TrezoaRpcApi>;
        //@ts-expect-error Should not be a testnet RPC
        mainnetRpc satisfies RpcTestnet<TrezoaRpcApi>;
    }
}

// [DESCRIBE] createTrezoaRpc.
{
    const genericRpc = createTrezoaRpc(genericUrl);
    const devnetRpc = createTrezoaRpc(devnetUrl);
    const testnetRpc = createTrezoaRpc(testnetUrl);
    const mainnetRpc = createTrezoaRpc(mainnetUrl);

    // No cluster specified should be generic `Rpc`.
    {
        genericRpc satisfies Rpc<TrezoaRpcApi>;
        //@ts-expect-error Should not be a devnet RPC
        genericRpc satisfies RpcDevnet<TrezoaRpcApi>;
        //@ts-expect-error Should not be a testnet RPC
        genericRpc satisfies RpcTestnet<TrezoaRpcApi>;
        //@ts-expect-error Should not be a mainnet RPC
        genericRpc satisfies RpcMainnet<TrezoaRpcApi>;
    }

    // Devnet cluster should be `RpcDevnet`.
    {
        devnetRpc satisfies Rpc<TrezoaRpcApi>;
        devnetRpc satisfies Rpc<TrezoaRpcApiDevnet>;
        devnetRpc satisfies RpcDevnet<TrezoaRpcApi>;
        devnetRpc satisfies RpcDevnet<TrezoaRpcApiDevnet>; // Same types
        //@ts-expect-error Should not be a testnet RPC
        devnetRpc satisfies RpcTestnet<TrezoaRpcApi>;
        //@ts-expect-error Should not be a mainnet RPC
        devnetRpc satisfies RpcMainnet<TrezoaRpcApi>;
    }

    // Testnet cluster should be `RpcTestnet`.
    {
        testnetRpc satisfies Rpc<TrezoaRpcApi>;
        testnetRpc satisfies Rpc<TrezoaRpcApiTestnet>;
        testnetRpc satisfies RpcTestnet<TrezoaRpcApi>;
        testnetRpc satisfies RpcTestnet<TrezoaRpcApiTestnet>; // Same types
        //@ts-expect-error Should not be a devnet RPC
        testnetRpc satisfies RpcDevnet<TrezoaRpcApi>;
        //@ts-expect-error Should not be a mainnet RPC
        testnetRpc satisfies RpcMainnet<TrezoaRpcApi>;
    }

    // Mainnet cluster should be `RpcMainnet`.
    {
        mainnetRpc satisfies Rpc<TrezoaRpcApiMainnet>;
        mainnetRpc satisfies RpcMainnet<TrezoaRpcApiMainnet>;
        //@ts-expect-error Should not have `requestAirdrop` method
        mainnetRpc satisfies Rpc<RequestAirdropApi>;
        //@ts-expect-error Should not be a devnet RPC
        mainnetRpc satisfies RpcDevnet<TrezoaRpcApi>;
        //@ts-expect-error Should not be a testnet RPC
        mainnetRpc satisfies RpcTestnet<TrezoaRpcApi>;
    }
}

// [DESCRIBE] TrezoaRpcApiFromClusterUrl
{
    const genericRpcApi = null as unknown as TrezoaRpcApiFromClusterUrl<ClusterUrl>;
    const devnetRpcApi = null as unknown as TrezoaRpcApiFromClusterUrl<DevnetUrl>;
    const testnetRpcApi = null as unknown as TrezoaRpcApiFromClusterUrl<TestnetUrl>;
    const mainnetRpcApi = null as unknown as TrezoaRpcApiFromClusterUrl<MainnetUrl>;

    // No cluster specified should be the most restricted `TrezoaRpcApi`, ie Mainnet.
    {
        genericRpcApi satisfies TrezoaRpcApiMainnet;
        //@ts-expect-error Should not be `TrezoaRpcApiDevnet`
        genericRpcApi satisfies TrezoaRpcApiDevnet;
        //@ts-expect-error Should not be `TrezoaRpcApiTestnet`
        genericRpcApi satisfies TrezoaRpcApiTestnet;
        //@ts-expect-error Should not be `TrezoaRpcApi`
        genericRpcApi satisfies TrezoaRpcApi;
    }

    // Devnet cluster should be `TrezoaRpcApiDevnet`.
    {
        devnetRpcApi satisfies TrezoaRpcApiDevnet;
        devnetRpcApi satisfies TrezoaRpcApi;
    }

    // Testnet cluster should be `TrezoaRpcApiTestnet`.
    {
        testnetRpcApi satisfies TrezoaRpcApiTestnet;
        testnetRpcApi satisfies TrezoaRpcApi;
    }

    // Mainnet cluster should be `TrezoaRpcApiMainnet`.
    {
        mainnetRpcApi satisfies TrezoaRpcApiMainnet;
        //@ts-expect-error Should not be `TrezoaRpcApiDevnet`
        mainnetRpcApi satisfies TrezoaRpcApiDevnet;
        //@ts-expect-error Should not be `TrezoaRpcApiTestnet`
        mainnetRpcApi satisfies TrezoaRpcApiTestnet;
        //@ts-expect-error Should not be `TrezoaRpcApi`
        mainnetRpcApi satisfies TrezoaRpcApi;
    }
}
