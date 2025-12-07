import { Address } from '@trezoa/addresses';
import type { Blockhash, StringifiedBigInt } from '@trezoa/rpc-types';

import { RpcParsedInfo } from './rpc-parsed-type';

export type JsonParsedNonceAccount = RpcParsedInfo<{
    authority: Address;
    blockhash: Blockhash;
    feeCalculator: Readonly<{
        lamportsPerSignature: StringifiedBigInt;
    }>;
}>;
