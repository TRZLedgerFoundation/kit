import type { Slot } from '@trezoa/rpc-types';

type GetMaxShredInsertSlotApiResponse = Slot;

export type GetMaxShredInsertSlotApi = {
    /**
     * Get the max slot seen from after shred insert.
     *
     * @see https://trezoa.com/docs/rpc/http/getmaxshredinsertslot
     */
    getMaxShredInsertSlot(): GetMaxShredInsertSlotApiResponse;
};
