import {
    TrezoaSignMessage,
    TrezoaSignMessageFeature,
    TrezoaSignMessageInput,
    TrezoaSignMessageOutput,
} from '@trezoa/wallet-standard-features';
import { getWalletAccountFeature, UiWalletAccount } from '@wallet-standard/ui';
import { getWalletAccountForUiWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from '@wallet-standard/ui-registry';
import { useCallback } from 'react';

type Input = Omit<TrezoaSignMessageInput, 'account'>;
type Output = Omit<TrezoaSignMessageOutput, 'signatureType'>;

/**
 * Use this to get a function capable of signing a message with the private key of a
 * {@link UiWalletAccount}
 *
 * @example
 * ```tsx
 * import { useSignMessage } from '@trezoa/react';
 *
 * function SignMessageButton({ account, messageBytes }) {
 *     const signMessage = useSignMessage(account);
 *     return (
 *         <button
 *             onClick={async () => {
 *                 try {
 *                     const { signature } = await signMessage({
 *                         message: messageBytes,
 *                     });
 *                     window.alert(`Signature bytes: ${signature.toString()}`);
 *                 } catch (e) {
 *                     console.error('Failed to sign message', e);
 *                 }
 *             }}
 *         >
 *             Sign Message
 *         </button>
 *     );
 * }
 * ```
 */
export function useSignMessage<TWalletAccount extends UiWalletAccount>(
    ...config: Parameters<typeof useSignMessages<TWalletAccount>>
): (input: Input) => Promise<Output> {
    const signMessages = useSignMessages(...config);
    return useCallback(
        async input => {
            const [result] = await signMessages(input);
            return result;
        },
        [signMessages],
    );
}

function useSignMessages<TWalletAccount extends UiWalletAccount>(
    uiWalletAccount: TWalletAccount,
): (...inputs: readonly Input[]) => Promise<readonly Output[]> {
    const signMessageFeature = getWalletAccountFeature(
        uiWalletAccount,
        TrezoaSignMessage,
    ) as TrezoaSignMessageFeature[typeof TrezoaSignMessage];
    const account = getWalletAccountForUiWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED(uiWalletAccount);
    return useCallback(
        async (...inputs) => {
            const inputsWithAccount = inputs.map(input => ({ ...input, account }));
            const results = await signMessageFeature.signMessage(...inputsWithAccount);
            const resultsWithoutSignatureType = results.map(
                ({
                    signatureType: _, // Trezoa signatures are always of type `ed25519` so drop this property.
                    ...rest
                }) => rest,
            );
            return resultsWithoutSignatureType;
        },
        [signMessageFeature, account],
    );
}
