import type { Rpc } from '@trezoa/rpc-spec';

import { MinimumLedgerSlotApi } from '../index';
import { createLocalhostTrezoaRpc } from './__setup__';

describe('minimumLedgerSlot', () => {
    let rpc: Rpc<MinimumLedgerSlotApi>;
    beforeEach(() => {
        rpc = createLocalhostTrezoaRpc();
    });
    describe('when called with no parameters', () => {
        it('returns a bigint', async () => {
            expect.assertions(1);
            const result = await rpc.minimumLedgerSlot().send();
            expect(result).toEqual(expect.any(BigInt));
        });
    });
});
