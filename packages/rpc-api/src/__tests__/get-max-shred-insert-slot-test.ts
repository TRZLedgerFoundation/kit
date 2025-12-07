import type { Rpc } from '@trezoa/rpc-spec';

import { GetMaxShredInsertSlotApi } from '../index';
import { createLocalhostTrezoaRpc } from './__setup__';

describe('getMaxShredInsertSlot', () => {
    let rpc: Rpc<GetMaxShredInsertSlotApi>;
    beforeEach(() => {
        rpc = createLocalhostTrezoaRpc();
    });
    describe('when called with no parameters', () => {
        it('returns a bigint', async () => {
            expect.assertions(1);
            const result = await rpc.getMaxShredInsertSlot().send();
            expect(result).toEqual(expect.any(BigInt));
        });
    });
});
