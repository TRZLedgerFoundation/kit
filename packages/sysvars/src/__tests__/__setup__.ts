import { createTrezoaRpcApi, type TrezoaRpcApi } from '@trezoa/rpc-api';
import { createRpc, type Rpc } from '@trezoa/rpc-spec';
import { createHttpTransport } from '@trezoa/rpc-transport-http';

export function createLocalhostTrezoaRpc(): Rpc<TrezoaRpcApi> {
    return createRpc({
        api: createTrezoaRpcApi(),
        transport: createHttpTransport({ url: 'http://127.0.0.1:8899' }),
    });
}
