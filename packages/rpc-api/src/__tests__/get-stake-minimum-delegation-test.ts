import type { Rpc } from '@trezoa/rpc-spec';
import type { Commitment } from '@trezoa/rpc-types';

import { GetStakeMinimumDelegationApi } from '../index';
import { createLocalhostTrezoaRpc } from './__setup__';

describe('getStakeMinimumDelegation', () => {
    let rpc: Rpc<GetStakeMinimumDelegationApi>;
    beforeEach(() => {
        rpc = createLocalhostTrezoaRpc();
    });
    (['confirmed', 'finalized', 'processed'] as Commitment[]).forEach(commitment => {
        describe(`when called with \`${commitment}\` commitment`, () => {
            it('returns the result as a bigint wrapped in an RpcResponseData', async () => {
                expect.assertions(1);
                const result = await rpc.getStakeMinimumDelegation({ commitment }).send();
                expect(result.value).toEqual(expect.any(BigInt));
            });
        });
    });
});
