import type { Address } from '@trezoa/addresses';
import type { StringifiedBigInt } from '@trezoa/rpc-types';

import { RpcParsedInfo } from './rpc-parsed-type';

export type JsonParsedAddressLookupTableAccount = RpcParsedInfo<{
    addresses: readonly Address[];
    authority?: Address;
    deactivationSlot: StringifiedBigInt;
    lastExtendedSlot: StringifiedBigInt;
    lastExtendedSlotStartIndex: number;
}>;
