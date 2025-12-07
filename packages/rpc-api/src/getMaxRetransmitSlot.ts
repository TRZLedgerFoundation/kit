import type { Slot } from '@trezoa/rpc-types';

type GetMaxRetransmitSlotApiResponse = Slot;

export type GetMaxRetransmitSlotApi = {
    /**
     * Get the max slot seen from retransmit stage.
     *
     * @see https://trezoa.com/docs/rpc/http/getmaxretransmitslot
     */
    getMaxRetransmitSlot(): GetMaxRetransmitSlotApiResponse;
};
