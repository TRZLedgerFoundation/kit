import type { Address } from '@trezoa/addresses';
import { TREZOA_ERROR__JSON_RPC__INVALID_PARAMS, TrezoaError } from '@trezoa/errors';
import type { Rpc } from '@trezoa/rpc-spec';
import type { Commitment } from '@trezoa/rpc-types';

import { GetTokenLargestAccountsApi, GetTokenSupplyApi } from '../index';
import { createLocalhostTrezoaRpc } from './__setup__';

const CONTEXT_MATCHER = expect.objectContaining({
    slot: expect.any(BigInt),
});

describe('getTokenLargestAccounts', () => {
    let rpc: Rpc<GetTokenLargestAccountsApi & GetTokenSupplyApi>;
    beforeEach(() => {
        rpc = createLocalhostTrezoaRpc();
    });

    (['confirmed', 'finalized', 'processed'] as Commitment[]).forEach(commitment => {
        describe(`when called with \`${commitment}\` commitment`, () => {
            // TODO: will need a way to create token mint + accounts in tests
            it('returns the 20 largest token accounts', async () => {
                expect.assertions(1);
                // See scripts/fixtures/tpl-token-mint-account.json
                const pubkey =
                    'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr' as Address<'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr'>;
                const tokenAccountBalancePromise = rpc.getTokenLargestAccounts(pubkey, { commitment }).send();
                await expect(tokenAccountBalancePromise).resolves.toStrictEqual({
                    context: CONTEXT_MATCHER,
                    value: [
                        {
                            address: 'AyGCwnwxQMCqaU4ixReHt8h5W4dwmxU7eM3BEQBdWVca',
                            amount: '9999999779500000',
                            decimals: 6,
                            // This can be Number or null, but we're using a fixture so it should be Number
                            uiAmount: 9999999779.5,
                            uiAmountString: '9999999779.5',
                        },
                    ],
                });
            });
        });
    });

    describe('when called with an account that is not a token mint', () => {
        it('throws an error', async () => {
            expect.assertions(1);
            const sendPromise = rpc
                .getTokenSupply(
                    // Randomly generated
                    'BnWCFuxmi6uH3ceVx4R8qcbWBMPVVYVVFWtAiiTA1PAu' as Address,
                )
                .send();
            await expect(sendPromise).rejects.toThrow(
                new TrezoaError(TREZOA_ERROR__JSON_RPC__INVALID_PARAMS, {
                    __serverMessage: 'Invalid params: missing field `commitment`.',
                }),
            );
        });
    });
});
