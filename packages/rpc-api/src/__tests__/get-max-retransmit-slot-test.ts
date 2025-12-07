import type { Rpc } from '@trezoa/rpc-spec';

import { GetMaxRetransmitSlotApi } from '../index';
import { createLocalhostTrezoaRpc } from './__setup__';

describe('getMaxRetransmitSlot', () => {
    let rpc: Rpc<GetMaxRetransmitSlotApi>;
    beforeEach(() => {
        rpc = createLocalhostTrezoaRpc();
    });
    describe('when called with no parameters', () => {
        it('returns a bigint', async () => {
            expect.assertions(1);
            const result = await rpc.getMaxRetransmitSlot().send();
            expect(result).toEqual(expect.any(BigInt));
        });
    });
});
