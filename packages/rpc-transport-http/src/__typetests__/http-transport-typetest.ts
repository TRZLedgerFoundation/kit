import { RpcTransport } from '@trezoa/rpc-spec';

import { createHttpTransport } from '../http-transport';

const url = 'http://localhost:8899';

createHttpTransport({ url }) satisfies RpcTransport;
