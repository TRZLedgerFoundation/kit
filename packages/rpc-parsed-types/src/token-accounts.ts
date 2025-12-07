import type { Address } from '@trezoa/addresses';
import type { StringifiedBigInt, TokenAmount } from '@trezoa/rpc-types';

import { RpcParsedType } from './rpc-parsed-type';

type TokenAccountState = 'frozen' | 'initialized' | 'uninitialized';

export type JsonParsedTokenAccount = Readonly<{
    closeAuthority?: Address;
    delegate?: Address;
    delegatedAmount?: TokenAmount;
    extensions?: readonly unknown[];
    isNative: boolean;
    mint: Address;
    owner: Address;
    rentExemptReserve?: TokenAmount;
    state: TokenAccountState;
    tokenAmount: TokenAmount;
}>;

type JsonParsedMintAccount = Readonly<{
    decimals: number;
    extensions?: readonly unknown[];
    freezeAuthority: Address | null;
    isInitialized: boolean;
    mintAuthority: Address | null;
    supply: StringifiedBigInt;
}>;

type JsonParsedMultisigAccount = Readonly<{
    isInitialized: boolean;
    numRequiredSigners: number;
    numValidSigners: number;
    signers: readonly Address[];
}>;

export type JsonParsedTokenProgramAccount =
    | RpcParsedType<'account', JsonParsedTokenAccount>
    | RpcParsedType<'mint', JsonParsedMintAccount>
    | RpcParsedType<'multisig', JsonParsedMultisigAccount>;
