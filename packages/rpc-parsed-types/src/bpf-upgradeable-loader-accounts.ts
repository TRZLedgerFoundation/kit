import type { Address } from '@trezoa/addresses';
import type { Base64EncodedDataResponse, Slot } from '@trezoa/rpc-types';

import type { RpcParsedType } from './rpc-parsed-type';

type JsonParsedBpfProgramAccount = Readonly<{
    programData: Address;
}>;

type JsonParsedBpfProgramDataAccount = Readonly<{
    authority?: Address;
    data: Base64EncodedDataResponse;
    slot: Slot;
}>;

export type JsonParsedBpfUpgradeableLoaderProgramAccount =
    | RpcParsedType<'program', JsonParsedBpfProgramAccount>
    | RpcParsedType<'programData', JsonParsedBpfProgramDataAccount>;
