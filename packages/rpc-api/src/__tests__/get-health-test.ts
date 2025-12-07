import { TREZOA_ERROR__JSON_RPC__SERVER_ERROR_NODE_UNHEALTHY, TrezoaError } from '@trezoa/errors';
import { createRpc, type Rpc } from '@trezoa/rpc-spec';

import { createTrezoaRpcApi, GetHealthApi } from '../index';
import { createLocalhostTrezoaRpc } from './__setup__';

describe('getHealth', () => {
    describe('when the node is healthy', () => {
        let rpc: Rpc<GetHealthApi>;
        beforeEach(() => {
            rpc = createLocalhostTrezoaRpc();
        });
        it('returns "ok"', async () => {
            expect.assertions(1);
            const healthPromise = rpc.getHealth().send();
            await expect(healthPromise).resolves.toBe('ok');
        });
    });

    describe('when the node is unhealthy', () => {
        let rpc: Rpc<GetHealthApi>;
        const errorMessage = 'Node is unhealthy';
        const errorCode = TREZOA_ERROR__JSON_RPC__SERVER_ERROR_NODE_UNHEALTHY;
        const errorObject = {
            code: errorCode,
            data: { numSlotsBehind: 123 },
            message: errorMessage,
        };
        beforeEach(() => {
            rpc = createRpc({
                api: createTrezoaRpcApi(),
                transport: jest.fn().mockResolvedValue({ error: errorObject }),
            });
        });
        it('returns an error message', async () => {
            expect.assertions(1);
            const healthPromise = rpc.getHealth().send();
            await expect(healthPromise).rejects.toThrow(
                new TrezoaError(TREZOA_ERROR__JSON_RPC__SERVER_ERROR_NODE_UNHEALTHY, {
                    numSlotsBehind: 123,
                }),
            );
        });
    });
});
