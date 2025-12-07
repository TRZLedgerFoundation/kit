import type { GetAccountInfoApi } from '@trezoa/rpc-api';
import type { Rpc } from '@trezoa/rpc-spec';

import { fetchSysvarSlotHashes, getSysvarSlotHashesCodec } from '../slot-hashes';
import { createLocalhostTrezoaRpc } from './__setup__';

describe('slot hashes', () => {
    let rpc: Rpc<GetAccountInfoApi>;
    beforeEach(() => {
        rpc = createLocalhostTrezoaRpc();
    });
    it('decode', () => {
        // prettier-ignore
        const slotHashesState = new Uint8Array([
            2, 0, 0, 0,                 // array length 
            134, 74, 2, 0, 0, 0, 0, 0,  // slot
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            134, 74, 2, 0, 0, 0, 0, 0,  // slot
            2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        ]);
        expect(getSysvarSlotHashesCodec().decode(slotHashesState)).toMatchObject(
            expect.arrayContaining([
                {
                    hash: '4vJ9JU1bJJE96FWSJKvHsmmFADCg4gpZQff4P3bkLKi',
                    slot: 150_150n,
                },
                {
                    hash: '8qbHbw2BbbTHBW1sbeqakYXVKRQM8Ne7pLK7m6CVfeR',
                    slot: 150_150n,
                },
            ]),
        );
    });
    it('fetch', async () => {
        expect.assertions(1);
        const slotHashes = await fetchSysvarSlotHashes(rpc);
        expect(slotHashes).toMatchObject(
            expect.arrayContaining([
                {
                    hash: expect.any(String),
                    slot: expect.any(BigInt),
                },
            ]),
        );
    });
});
