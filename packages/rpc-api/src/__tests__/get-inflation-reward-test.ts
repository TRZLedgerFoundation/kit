import {
    TREZOA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_NOT_AVAILABLE,
    TREZOA_ERROR__JSON_RPC__SERVER_ERROR_MIN_CONTEXT_SLOT_NOT_REACHED,
    TrezoaError,
} from '@trezoa/errors';
import type { Rpc } from '@trezoa/rpc-spec';
import type { Commitment } from '@trezoa/rpc-types';

import { GetInflationRewardApi } from '../index';
import { createLocalhostTrezoaRpc } from './__setup__';

describe('getInflationReward', () => {
    let rpc: Rpc<GetInflationRewardApi>;
    beforeEach(() => {
        rpc = createLocalhostTrezoaRpc();
    });
    [{ minContextSlot: 0n }, null].forEach(minContextConfig => {
        describe(`when called with ${
            minContextConfig ? `a \`minContextSlot\` of ${minContextConfig.minContextSlot}` : 'no `minContextSlot`'
        }`, () => {
            (['confirmed', 'finalized', 'processed'] as Commitment[]).forEach(commitment => {
                describe(`when called with \`${commitment}\` commitment`, () => {
                    // TODO(#1240) Figure out a way to write tests for these.
                    // * Need to be able to fast-forward the validator to have at least one epoch.
                    // * Need to prepare a fixture address that is owed an inflation/staking reward.
                    it.todo('returns null for an address expected to have no inflation rewards');
                    it.todo('returns the inflation reward details for an address expected to have an inflation reward');
                });
            });
        });
    });
    describe('when called with an `epoch` higher than the highest epoch available', () => {
        it('throws an error', async () => {
            expect.assertions(3);
            const sendPromise = rpc
                .getInflationReward([], {
                    epoch: 2n ** 63n - 1n, // u64:MAX; safe bet it'll be too high.
                })
                .send();
            await Promise.all([
                expect(sendPromise).rejects.toThrow(TrezoaError),
                expect(sendPromise).rejects.toHaveProperty(
                    'context.__code',
                    TREZOA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_NOT_AVAILABLE,
                ),
                expect(sendPromise).rejects.toHaveProperty(
                    'context.__serverMessage',
                    expect.stringMatching(/Block not available for slot \d+/),
                ),
            ]);
        });
    });
    describe('when called with a `minContextSlot` higher than the highest slot available', () => {
        it('throws an error', async () => {
            expect.assertions(3);
            const sendPromise = rpc
                .getInflationReward([], {
                    minContextSlot: 2n ** 63n - 1n, // u64:MAX; safe bet it'll be too high.
                })
                .send();
            await Promise.all([
                expect(sendPromise).rejects.toThrow(TrezoaError),
                expect(sendPromise).rejects.toHaveProperty(
                    'context.__code',
                    TREZOA_ERROR__JSON_RPC__SERVER_ERROR_MIN_CONTEXT_SLOT_NOT_REACHED,
                ),
                expect(sendPromise).rejects.toHaveProperty('context.contextSlot', expect.any(BigInt)),
            ]);
        });
    });
});
