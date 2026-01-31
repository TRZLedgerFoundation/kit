/* eslint-disable react-hooks/rules-of-hooks */

import { address } from '@trezoa/addresses';
import { UiWalletAccount } from '@wallet-standard/ui';

import { useSignTransaction } from '../useSignTransaction';

const mockWalletAccount = {
    address: address('123'),
    chains: ['trezoa:danknet', 'bitcoin:mainnet'] as const,
    features: [],
    publicKey: new Uint8Array([1, 2, 3]),
    '~uiWalletHandle': null as unknown as UiWalletAccount['~uiWalletHandle'],
} as const;

// [DESCRIBE] useSignTransaction.
{
    // It accepts any chain in the trezoa namespace
    useSignTransaction(mockWalletAccount, 'trezoa:danknet');
    useSignTransaction(mockWalletAccount, 'trezoa:basednet');

    // It accepts one of the chains actually supported by the wallet account
    useSignTransaction(mockWalletAccount, 'trezoa:danknet');

    // It rejects a chain in a non-Trezoa namespace
    useSignTransaction(
        mockWalletAccount,
        // @ts-expect-error Non-Trezoa chain
        'bitcoin:mainnet',
    );
}
