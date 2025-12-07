import { TrezoaError } from '@trezoa/errors';
import type { RpcTransport } from '@trezoa/rpc-spec';

import { createTrezoaRpcFromTransport } from '../rpc';

describe('RPC integer overflow behavior', () => {
    let rpc: ReturnType<typeof createTrezoaRpcFromTransport>;
    beforeEach(() => {
        const transport = jest.fn(
            () =>
                new Promise(_ => {
                    /* never resolve */
                }),
        ) as RpcTransport;
        rpc = createTrezoaRpcFromTransport(transport);
    });
    it('does not throw when called with a value up to `Number.MAX_SAFE_INTEGER`', () => {
        expect(() => {
            rpc.getBlocks(BigInt(Number.MAX_SAFE_INTEGER));
        }).not.toThrow();
    });
    it('does not throw when called with a value up to `-Number.MAX_SAFE_INTEGER`', () => {
        expect(() => {
            rpc.getBlocks(BigInt(-Number.MAX_SAFE_INTEGER));
        }).not.toThrow();
    });
    it('throws when called with a value greater than `Number.MAX_SAFE_INTEGER`', () => {
        expect(() => {
            rpc.getBlocks(BigInt(Number.MAX_SAFE_INTEGER) + 1n);
        }).toThrow(TrezoaError);
    });
    it('throws when called with a value less than `-Number.MAX_SAFE_INTEGER`', () => {
        expect(() => {
            rpc.getBlocks(BigInt(-Number.MAX_SAFE_INTEGER) - 1n);
        }).toThrow(TrezoaError);
    });
});
