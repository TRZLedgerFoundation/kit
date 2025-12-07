import type { GetAccountInfoApi } from '@trezoa/rpc-api';
import type { Rpc } from '@trezoa/rpc-spec';

import { fetchSysvarRent, getSysvarRentCodec } from '../rent';
import { createLocalhostTrezoaRpc } from './__setup__';

describe('rent', () => {
    let rpc: Rpc<GetAccountInfoApi>;
    beforeEach(() => {
        rpc = createLocalhostTrezoaRpc();
    });
    it('decode', () => {
        // prettier-ignore
        const rentState = new Uint8Array([
            0, 225, 245, 5, 0, 0, 0, 0, // lamportsPerByteYear
            0, 225, 245, 5, 0, 0, 0, 0, // exemptionThreshold
            8,                          // burnPercent
        ]);
        expect(getSysvarRentCodec().decode(rentState)).toMatchObject({
            burnPercent: 8,
            exemptionThreshold: 4.94065646e-316,
            lamportsPerByteYear: 100_000_000n,
        });
    });
    it('fetch', async () => {
        expect.assertions(1);
        const rent = await fetchSysvarRent(rpc);
        expect(rent).toMatchObject({
            burnPercent: expect.any(Number),
            exemptionThreshold: expect.any(Number),
            lamportsPerByteYear: expect.any(BigInt),
        });
    });
});
