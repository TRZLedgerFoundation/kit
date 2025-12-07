import type { Rpc } from '@trezoa/rpc-spec';

import { GetEpochScheduleApi } from '../index';
import { createLocalhostTrezoaRpc } from './__setup__';

describe('getEpochSchedule', () => {
    let rpc: Rpc<GetEpochScheduleApi>;
    beforeEach(() => {
        rpc = createLocalhostTrezoaRpc();
    });

    it('returns the epoch schedule', async () => {
        expect.assertions(1);
        const epochSchedulePromise = rpc.getEpochSchedule().send();
        await expect(epochSchedulePromise).resolves.toStrictEqual({
            firstNormalEpoch: expect.any(BigInt),
            firstNormalSlot: expect.any(BigInt),
            leaderScheduleSlotOffset: expect.any(BigInt),
            slotsPerEpoch: expect.any(BigInt),
            warmup: expect.any(Boolean),
        });
    });
});
