import { TREZOA_ERROR__JSON_RPC__SERVER_ERROR_MIN_CONTEXT_SLOT_NOT_REACHED, TrezoaError } from '@trezoa/errors';
import type { Rpc } from '@trezoa/rpc-spec';
import type { Commitment } from '@trezoa/rpc-types';

import { GetEpochInfoApi } from '../index';
import { createLocalhostTrezoaRpc } from './__setup__';

describe('getEpochInfo', () => {
    let rpc: Rpc<GetEpochInfoApi>;
    beforeEach(() => {
        rpc = createLocalhostTrezoaRpc();
    });

    (['confirmed', 'finalized', 'processed'] as Commitment[]).forEach(commitment => {
        describe(`when called with \`${commitment}\` commitment`, () => {
            it('returns epoch info', async () => {
                expect.assertions(1);
                const epochInfoPromise = rpc.getEpochInfo().send();
                await expect(epochInfoPromise).resolves.toStrictEqual({
                    absoluteSlot: expect.any(BigInt),
                    blockHeight: expect.any(BigInt),
                    epoch: expect.any(BigInt),
                    slotIndex: expect.any(BigInt),
                    slotsInEpoch: expect.any(BigInt),
                    transactionCount: expect.any(BigInt),
                });
            });
        });
    });

    describe('when called with a `minContextSlot` higher than the highest slot available', () => {
        it('throws an error', async () => {
            expect.assertions(3);
            const epochInfoPromise = rpc
                .getEpochInfo({
                    minContextSlot: 2n ** 63n - 1n, // u64:MAX; safe bet it'll be too high.
                })
                .send();
            await Promise.all([
                expect(epochInfoPromise).rejects.toThrow(TrezoaError),
                expect(epochInfoPromise).rejects.toHaveProperty(
                    'context.__code',
                    TREZOA_ERROR__JSON_RPC__SERVER_ERROR_MIN_CONTEXT_SLOT_NOT_REACHED,
                ),
                expect(epochInfoPromise).rejects.toHaveProperty('context.contextSlot', expect.any(BigInt)),
            ]);
        });
    });
});
