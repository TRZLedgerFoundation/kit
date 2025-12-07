import type { Rpc } from '@trezoa/rpc-spec';

import { GetFirstAvailableBlockApi } from '../index';
import { createLocalhostTrezoaRpc } from './__setup__';

describe('getFirstAvailableBlock', () => {
    let rpc: Rpc<GetFirstAvailableBlockApi>;
    beforeEach(() => {
        rpc = createLocalhostTrezoaRpc();
    });
    describe('when called with no parameters', () => {
        it('returns a bigint', async () => {
            expect.assertions(1);
            const result = await rpc.getFirstAvailableBlock().send();
            expect(result).toEqual(expect.any(BigInt));
        });
    });
});
