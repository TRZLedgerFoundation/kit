import type { Address } from '@trezoa/addresses';
import { getBase58Decoder } from '@trezoa/codecs-strings';
import type { Rpc } from '@trezoa/rpc-spec';
import type { Commitment, Lamports } from '@trezoa/rpc-types';

import { RequestAirdropApi } from '../index';
import { createLocalhostTrezoaRpc } from './__setup__';

describe('requestAirdrop', () => {
    let rpc: Rpc<RequestAirdropApi>;
    beforeEach(() => {
        rpc = createLocalhostTrezoaRpc();
    });
    (['confirmed', 'finalized', 'processed'] as Commitment[]).forEach(commitment => {
        describe(`when called with \`${commitment}\` commitment`, () => {
            it('returns the signature of the airdrop', async () => {
                expect.assertions(1);
                const randomBytes = new Uint8Array(32);
                crypto.getRandomValues(randomBytes);
                const publicKeyAddress = getBase58Decoder().decode(randomBytes);
                const resultPromise = rpc
                    .requestAirdrop(publicKeyAddress as Address, 5000000n as Lamports, {
                        commitment,
                    })
                    .send();
                await expect(resultPromise).resolves.toEqual(expect.any(String));
            });
        });
    });
});
