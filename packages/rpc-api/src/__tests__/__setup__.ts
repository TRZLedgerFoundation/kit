import { createRpc, Rpc } from '@trezoa/rpc-spec';
import { createHttpTransportForTrezoaRpc } from '@trezoa/rpc-transport-http';

import { createTrezoaRpcApi, TrezoaRpcApi } from '..';

export function createLocalhostTrezoaRpc(): Rpc<TrezoaRpcApi> {
    return createRpc({
        api: createTrezoaRpcApi(),
        transport: createHttpTransportForTrezoaRpc({ url: 'http://127.0.0.1:8899' }),
    });
}
