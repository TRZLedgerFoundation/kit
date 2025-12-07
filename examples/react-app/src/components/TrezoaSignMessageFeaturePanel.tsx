import type { Address } from '@trezoa/kit';
import { useWalletAccountMessageSigner } from '@trezoa/react';
import type { ReadonlyUint8Array } from '@wallet-standard/core';
import type { UiWalletAccount } from '@wallet-standard/react';
import { useCallback } from 'react';

import { BaseSignMessageFeaturePanel } from './BaseSignMessageFeaturePanel';

type Props = Readonly<{
    account: UiWalletAccount;
}>;

export function TrezoaSignMessageFeaturePanel({ account }: Props) {
    const messageSigner = useWalletAccountMessageSigner(account);
    const signMessage = useCallback(
        async (message: ReadonlyUint8Array) => {
            const [result] = await messageSigner.modifyAndSignMessages([
                {
                    content: message as Uint8Array,
                    signatures: {},
                },
            ]);
            const signature = result?.signatures[account.address as Address];
            if (!signature) {
                throw new Error();
            }
            return signature as ReadonlyUint8Array;
        },
        [account.address, messageSigner],
    );
    return <BaseSignMessageFeaturePanel signMessage={signMessage} />;
}
