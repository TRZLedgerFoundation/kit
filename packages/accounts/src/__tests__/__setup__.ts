import type { Address } from '@trezoa/addresses';
import type { Decoder } from '@trezoa/codecs-core';
import type { PendingRpcRequest, Rpc } from '@trezoa/rpc-spec';
import type {
    AccountInfoBase,
    AccountInfoWithBase58Bytes,
    AccountInfoWithBase58EncodedData,
    AccountInfoWithBase64EncodedData,
    TrezoaRpcResponse,
} from '@trezoa/rpc-types';

import type { GetAccountInfoApi, GetMultipleAccountsApi, JsonParsedDataResponse } from '../rpc-api';

export type Base64RpcAccount = AccountInfoBase & AccountInfoWithBase64EncodedData;
export type Base58RpcAccount = AccountInfoBase & (AccountInfoWithBase58Bytes | AccountInfoWithBase58EncodedData);
export type JsonParsedRpcAccount = AccountInfoBase & { readonly data: JsonParsedDataResponse<unknown> };

export function getMockRpc(
    accounts: Record<Address, Base64RpcAccount | JsonParsedRpcAccount>,
): Rpc<GetAccountInfoApi | GetMultipleAccountsApi> & { getAccountInfo: jest.Mock; getMultipleAccounts: jest.Mock } {
    const wrapInPendingResponse = <T>(value: T): PendingRpcRequest<TrezoaRpcResponse<T>> => {
        const send = jest.fn().mockResolvedValue({ context: { slot: 0n }, value });
        return { send };
    };

    const getAccountInfo = jest
        .fn()
        .mockImplementation((address: Address) => wrapInPendingResponse(accounts[address] ?? null));

    const getMultipleAccounts = jest
        .fn()
        .mockImplementation((addresses: Address[]) =>
            wrapInPendingResponse(addresses.map(address => accounts[address] ?? null)),
        );

    return { getAccountInfo, getMultipleAccounts };
}

export function getMockDecoder<T>(mockValue: T): Decoder<T> {
    return {
        decode: jest.fn().mockReturnValueOnce(mockValue),
        read: jest.fn().mockReturnValueOnce([mockValue, 42]),
    } as Decoder<T>;
}
