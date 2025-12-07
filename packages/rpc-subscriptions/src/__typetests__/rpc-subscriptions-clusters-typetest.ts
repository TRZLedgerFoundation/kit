import type { TrezoaRpcSubscriptionsApi, TrezoaRpcSubscriptionsApiUnstable } from '@trezoa/rpc-subscriptions-api';
import type {
    RpcSubscriptions,
    RpcSubscriptionsChannelCreator,
    RpcSubscriptionsTransport,
} from '@trezoa/rpc-subscriptions-spec';
import { devnet, mainnet, testnet } from '@trezoa/rpc-types';

import {
    createTrezoaRpcSubscriptions,
    createTrezoaRpcSubscriptions_UNSTABLE,
    createTrezoaRpcSubscriptionsFromTransport,
} from '../rpc-subscriptions';
import { createDefaultRpcSubscriptionsChannelCreator } from '../rpc-subscriptions-channel';
import type {
    RpcSubscriptionsChannelCreatorDevnet,
    RpcSubscriptionsChannelCreatorMainnet,
    RpcSubscriptionsChannelCreatorTestnet,
    RpcSubscriptionsDevnet,
    RpcSubscriptionsMainnet,
    RpcSubscriptionsTestnet,
    RpcSubscriptionsTransportDevnet,
    RpcSubscriptionsTransportMainnet,
    RpcSubscriptionsTransportTestnet,
} from '../rpc-subscriptions-clusters';
import { createRpcSubscriptionsTransportFromChannelCreator } from '../rpc-subscriptions-transport';

// Define cluster-aware URLs and transports.

const genericUrl = 'http://localhost:8899';
const devnetUrl = devnet('https://api.devnet.trezoa.com');
const testnetUrl = testnet('https://api.testnet.trezoa.com');
const mainnetUrl = mainnet('https://api.mainnet-beta.trezoa.com');

// [DESCRIBE] createDefaultRpcSubscriptionsChannelCreator.
{
    const genericChannelCreator = createDefaultRpcSubscriptionsChannelCreator({ url: genericUrl });
    const devnetChannelCreator = createDefaultRpcSubscriptionsChannelCreator({ url: devnetUrl });
    const testnetChannelCreator = createDefaultRpcSubscriptionsChannelCreator({ url: testnetUrl });
    const mainnetChannelCreator = createDefaultRpcSubscriptionsChannelCreator({ url: mainnetUrl });

    // When no cluster is specified, it should be a generic `RpcSubscriptionsChannel`.
    {
        genericChannelCreator satisfies RpcSubscriptionsChannelCreator<unknown, unknown>;
        // @ts-expect-error Should not be a testnet channel
        genericChannelCreator satisfies RpcSubscriptionsChannelCreatorDevnet<unknown, unknown>;
        // @ts-expect-error Should not be a testnet channel
        genericChannelCreator satisfies RpcSubscriptionsChannelCreatorTestnet<unknown, unknown>;
        // @ts-expect-error Should not be a mainnet channel
        genericChannelCreator satisfies RpcSubscriptionsChannelCreatorMainnet<unknown, unknown>;
    }

    // Devnet cluster should be `RpcSubscriptionsChannelCreatorDevnet`.
    {
        devnetChannelCreator satisfies RpcSubscriptionsChannelCreatorDevnet<unknown, unknown>;
        // @ts-expect-error Should not be a testnet channel
        devnetChannelCreator satisfies RpcSubscriptionsChannelCreatorTestnet<unknown, unknown>;
        // @ts-expect-error Should not be a mainnet channel
        devnetChannelCreator satisfies RpcSubscriptionsChannelCreatorMainnet<unknown, unknown>;
    }

    // Testnet cluster should be `RpcSubscriptionsChannelCreatorTestnet`.
    {
        testnetChannelCreator satisfies RpcSubscriptionsChannelCreatorTestnet<unknown, unknown>;
        // @ts-expect-error Should not be a devnet channel
        testnetChannelCreator satisfies RpcSubscriptionsChannelCreatorDevnet<unknown, unknown>;
        // @ts-expect-error Should not be a mainnet channel
        testnetChannelCreator satisfies RpcSubscriptionsChannelCreatorMainnet<unknown, unknown>;
    }

    // Mainnet cluster should be `RpcSubscriptionsChannelCreatorMainnet`.
    {
        mainnetChannelCreator satisfies RpcSubscriptionsChannelCreatorMainnet<unknown, unknown>;
        // @ts-expect-error Should not be a devnet channel
        mainnetChannelCreator satisfies RpcSubscriptionsChannelCreatorDevnet<unknown, unknown>;
        // @ts-expect-error Should not be a testnet channel
        mainnetChannelCreator satisfies RpcSubscriptionsChannelCreatorTestnet<unknown, unknown>;
    }
}

// [DESCRIBE] createRpcSubscriptionsTransportFromChannelCreator.
{
    const genericTransport = createRpcSubscriptionsTransportFromChannelCreator(
        null as unknown as RpcSubscriptionsChannelCreator<unknown, unknown>,
    );
    const devnetTransport = createRpcSubscriptionsTransportFromChannelCreator(
        null as unknown as RpcSubscriptionsChannelCreatorDevnet<unknown, unknown>,
    );
    const testnetTransport = createRpcSubscriptionsTransportFromChannelCreator(
        null as unknown as RpcSubscriptionsChannelCreatorTestnet<unknown, unknown>,
    );
    const mainnetTransport = createRpcSubscriptionsTransportFromChannelCreator(
        null as unknown as RpcSubscriptionsChannelCreatorMainnet<unknown, unknown>,
    );

    // When no cluster is specified, it should be a generic `RpcSubscriptionsTransport{
    {
        genericTransport satisfies RpcSubscriptionsTransport;
        // @ts-expect-error Should not be a testnet channel
        genericTransport satisfies RpcSubscriptionsTransportDevnet;
        // @ts-expect-error Should not be a testnet channel
        genericTransport satisfies RpcSubscriptionsTransportTestnet;
        // @ts-expect-error Should not be a mainnet channel
        genericTransport satisfies RpcSubscriptionsTransportMainnet;
    }

    // Devnet cluster should be `RpcSubscriptionsTransportDevnet`.
    {
        devnetTransport satisfies RpcSubscriptionsTransportDevnet;
        // @ts-expect-error Should not be a testnet channel
        devnetTransport satisfies RpcSubscriptionsTransportTestnet;
        // @ts-expect-error Should not be a mainnet channel
        devnetTransport satisfies RpcSubscriptionsTransportMainnet;
    }

    // Testnet cluster should be `RpcSubscriptionsTransportTestnet`.
    {
        testnetTransport satisfies RpcSubscriptionsTransportTestnet;
        // @ts-expect-error Should not be a devnet channel
        testnetTransport satisfies RpcSubscriptionsTransportDevnet;
        // @ts-expect-error Should not be a mainnet channel
        testnetTransport satisfies RpcSubscriptionsTransportMainnet;
    }

    // Mainnet cluster should be `RpcSubscriptionsTransportMainnet`.
    {
        mainnetTransport satisfies RpcSubscriptionsTransportMainnet;
        // @ts-expect-error Should not be a devnet channel
        mainnetTransport satisfies RpcSubscriptionsTransportDevnet;
        // @ts-expect-error Should not be a testnet channel
        mainnetTransport satisfies RpcSubscriptionsTransportTestnet;
    }
}

// [DESCRIBE] createTrezoaRpcSubscriptionsFromTransport.
{
    const genericRpc = createTrezoaRpcSubscriptionsFromTransport(null as unknown as RpcSubscriptionsTransport);
    const devnetRpc = createTrezoaRpcSubscriptionsFromTransport(null as unknown as RpcSubscriptionsTransportDevnet);
    const testnetRpc = createTrezoaRpcSubscriptionsFromTransport(null as unknown as RpcSubscriptionsTransportTestnet);
    const mainnetRpc = createTrezoaRpcSubscriptionsFromTransport(null as unknown as RpcSubscriptionsTransportMainnet);

    // Checking stable subscriptions.
    {
        genericRpc satisfies RpcSubscriptions<TrezoaRpcSubscriptionsApi>;
        devnetRpc satisfies RpcSubscriptions<TrezoaRpcSubscriptionsApi>;
        testnetRpc satisfies RpcSubscriptions<TrezoaRpcSubscriptionsApi>;
        mainnetRpc satisfies RpcSubscriptions<TrezoaRpcSubscriptionsApi>;

        // @ts-expect-error Should not have unstable subscriptions
        genericRpc satisfies RpcSubscriptions<TrezoaRpcSubscriptionsApi & TrezoaRpcSubscriptionsApiUnstable>;
        // @ts-expect-error Should not have unstable subscriptions
        devnetRpc satisfies RpcSubscriptions<TrezoaRpcSubscriptionsApi & TrezoaRpcSubscriptionsApiUnstable>;
        // @ts-expect-error Should not have unstable subscriptions
        testnetRpc satisfies RpcSubscriptions<TrezoaRpcSubscriptionsApi & TrezoaRpcSubscriptionsApiUnstable>;
        // @ts-expect-error Should not have unstable subscriptions
        mainnetRpc satisfies RpcSubscriptions<TrezoaRpcSubscriptionsApi & TrezoaRpcSubscriptionsApiUnstable>;
    }

    // When no cluster is specified, it should be a generic `RpcSubscriptions`.
    {
        genericRpc satisfies RpcSubscriptions<TrezoaRpcSubscriptionsApi>;
        // @ts-expect-error Should not be a devnet RPC
        genericRpc satisfies RpcSubscriptionsDevnet<TrezoaRpcSubscriptionsApi>;
        // @ts-expect-error Should not be a testnet RPC
        genericRpc satisfies RpcSubscriptionsTestnet<TrezoaRpcSubscriptionsApi>;
        // @ts-expect-error Should not be a mainnet RPC
        genericRpc satisfies RpcSubscriptionsMainnet<TrezoaRpcSubscriptionsApi>;
    }

    // Devnet cluster should be `RpcSubscriptionsDevnet`.
    {
        devnetRpc satisfies RpcSubscriptions<TrezoaRpcSubscriptionsApi>;
        devnetRpc satisfies RpcSubscriptionsDevnet<TrezoaRpcSubscriptionsApi>;
        // @ts-expect-error Should not be a testnet RPC
        devnetRpc satisfies RpcSubscriptionsTestnet<TrezoaRpcSubscriptionsApi>;
        // @ts-expect-error Should not be a mainnet RPC
        devnetRpc satisfies RpcSubscriptionsMainnet<TrezoaRpcSubscriptionsApi>;
    }

    // Testnet cluster should be `RpcSubscriptionsTestnet`.
    {
        testnetRpc satisfies RpcSubscriptions<TrezoaRpcSubscriptionsApi>;
        testnetRpc satisfies RpcSubscriptionsTestnet<TrezoaRpcSubscriptionsApi>;
        // @ts-expect-error Should not be a devnet RPC
        testnetRpc satisfies RpcSubscriptionsDevnet<TrezoaRpcSubscriptionsApi>;
        // @ts-expect-error Should not be a mainnet RPC
        testnetRpc satisfies RpcSubscriptionsMainnet<TrezoaRpcSubscriptionsApi>;
    }

    // Mainnet cluster should be `RpcSubscriptionsMainnet`.
    {
        mainnetRpc satisfies RpcSubscriptions<TrezoaRpcSubscriptionsApi>;
        mainnetRpc satisfies RpcSubscriptionsMainnet<TrezoaRpcSubscriptionsApi>;
        // @ts-expect-error Should not be a devnet RPC
        mainnetRpc satisfies RpcSubscriptionsDevnet<TrezoaRpcSubscriptionsApi>;
        // @ts-expect-error Should not be a testnet RPC
        mainnetRpc satisfies RpcSubscriptionsTestnet<TrezoaRpcSubscriptionsApi>;
    }
}

// [DESCRIBE] createTrezoaRpcSubscriptions.
{
    const genericRpc = createTrezoaRpcSubscriptions(genericUrl);
    const devnetRpc = createTrezoaRpcSubscriptions(devnetUrl);
    const testnetRpc = createTrezoaRpcSubscriptions(testnetUrl);
    const mainnetRpc = createTrezoaRpcSubscriptions(mainnetUrl);

    // Checking stable subscriptions.
    {
        genericRpc satisfies RpcSubscriptions<TrezoaRpcSubscriptionsApi>;
        devnetRpc satisfies RpcSubscriptions<TrezoaRpcSubscriptionsApi>;
        testnetRpc satisfies RpcSubscriptions<TrezoaRpcSubscriptionsApi>;
        mainnetRpc satisfies RpcSubscriptions<TrezoaRpcSubscriptionsApi>;

        // @ts-expect-error Should not have unstable subscriptions
        genericRpc satisfies RpcSubscriptions<TrezoaRpcSubscriptionsApi & TrezoaRpcSubscriptionsApiUnstable>;
        // @ts-expect-error Should not have unstable subscriptions
        devnetRpc satisfies RpcSubscriptions<TrezoaRpcSubscriptionsApi & TrezoaRpcSubscriptionsApiUnstable>;
        // @ts-expect-error Should not have unstable subscriptions
        testnetRpc satisfies RpcSubscriptions<TrezoaRpcSubscriptionsApi & TrezoaRpcSubscriptionsApiUnstable>;
        // @ts-expect-error Should not have unstable subscriptions
        mainnetRpc satisfies RpcSubscriptions<TrezoaRpcSubscriptionsApi & TrezoaRpcSubscriptionsApiUnstable>;
    }

    // When no cluster is specified, it should be a generic `RpcSubscriptions`.
    {
        genericRpc satisfies RpcSubscriptions<TrezoaRpcSubscriptionsApi>;
        // @ts-expect-error Should not be a devnet RPC
        genericRpc satisfies RpcSubscriptionsDevnet<TrezoaRpcSubscriptionsApi>;
        // @ts-expect-error Should not be a testnet RPC
        genericRpc satisfies RpcSubscriptionsTestnet<TrezoaRpcSubscriptionsApi>;
        // @ts-expect-error Should not be a mainnet RPC
        genericRpc satisfies RpcSubscriptionsMainnet<TrezoaRpcSubscriptionsApi>;
    }

    // Devnet cluster should be `RpcSubscriptionsDevnet`.
    {
        devnetRpc satisfies RpcSubscriptions<TrezoaRpcSubscriptionsApi>;
        devnetRpc satisfies RpcSubscriptionsDevnet<TrezoaRpcSubscriptionsApi>;
        // @ts-expect-error Should not be a testnet RPC
        devnetRpc satisfies RpcSubscriptionsTestnet<TrezoaRpcSubscriptionsApi>;
        // @ts-expect-error Should not be a mainnet RPC
        devnetRpc satisfies RpcSubscriptionsMainnet<TrezoaRpcSubscriptionsApi>;
    }

    // Testnet cluster should be `RpcSubscriptionsTestnet`.
    {
        testnetRpc satisfies RpcSubscriptions<TrezoaRpcSubscriptionsApi>;
        testnetRpc satisfies RpcSubscriptionsTestnet<TrezoaRpcSubscriptionsApi>;
        // @ts-expect-error Should not be a devnet RPC
        testnetRpc satisfies RpcSubscriptionsDevnet<TrezoaRpcSubscriptionsApi>;
        // @ts-expect-error Should not be a mainnet RPC
        testnetRpc satisfies RpcSubscriptionsMainnet<TrezoaRpcSubscriptionsApi>;
    }

    // Mainnet cluster should be `RpcSubscriptionsMainnet`.
    {
        mainnetRpc satisfies RpcSubscriptions<TrezoaRpcSubscriptionsApi>;
        mainnetRpc satisfies RpcSubscriptionsMainnet<TrezoaRpcSubscriptionsApi>;
        // @ts-expect-error Should not be a devnet RPC
        mainnetRpc satisfies RpcSubscriptionsDevnet<TrezoaRpcSubscriptionsApi>;
        // @ts-expect-error Should not be a testnet RPC
        mainnetRpc satisfies RpcSubscriptionsTestnet<TrezoaRpcSubscriptionsApi>;
    }
}

// [DESCRIBE] createTrezoaRpcSubscriptions_UNSTABLE.
{
    const genericRpc = createTrezoaRpcSubscriptions_UNSTABLE(genericUrl);
    const devnetRpc = createTrezoaRpcSubscriptions_UNSTABLE(devnetUrl);
    const testnetRpc = createTrezoaRpcSubscriptions_UNSTABLE(testnetUrl);
    const mainnetRpc = createTrezoaRpcSubscriptions_UNSTABLE(mainnetUrl);

    // Checking unstable subscriptions.
    {
        genericRpc satisfies RpcSubscriptions<TrezoaRpcSubscriptionsApi & TrezoaRpcSubscriptionsApiUnstable>;
        devnetRpc satisfies RpcSubscriptionsDevnet<TrezoaRpcSubscriptionsApi & TrezoaRpcSubscriptionsApiUnstable>;
        testnetRpc satisfies RpcSubscriptionsTestnet<TrezoaRpcSubscriptionsApi & TrezoaRpcSubscriptionsApiUnstable>;
        mainnetRpc satisfies RpcSubscriptionsMainnet<TrezoaRpcSubscriptionsApi & TrezoaRpcSubscriptionsApiUnstable>;
    }
}
