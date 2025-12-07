import {
    TrezoaSignAndSendTransaction,
    TrezoaSignAndSendTransactionFeature,
    TrezoaSignAndSendTransactionInput,
    TrezoaSignAndSendTransactionOutput,
} from '@trezoa/wallet-standard-features';
import {
    WALLET_STANDARD_ERROR__FEATURES__WALLET_ACCOUNT_CHAIN_UNSUPPORTED,
    WalletStandardError,
} from '@wallet-standard/errors';
import { getWalletAccountFeature, type UiWalletAccount } from '@wallet-standard/ui';
import { getWalletAccountForUiWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from '@wallet-standard/ui-registry';
import { useCallback } from 'react';

import { OnlyTrezoaChains } from './chain';

type Input = Readonly<
    Omit<TrezoaSignAndSendTransactionInput, 'account' | 'chain' | 'options'> & {
        options?: Readonly<{
            minContextSlot?: bigint;
        }>;
    }
>;
type Output = TrezoaSignAndSendTransactionOutput;

/**
 * Use this to get a function capable of signing a serialized transaction with the private key of a
 * {@link UiWalletAccount} and sending it to the network for processing.
 *
 * @param chain The identifier of the chain the transaction is destined for. Wallets may use this to
 * simulate the transaction for the user.
 *
 * @example
 * ```tsx
 * import { getBase58Decoder } from '@trezoa/codecs-strings';
 * import { useSignAndSendTransaction } from '@trezoa/react';
 *
 * function SignAndSendTransactionButton({ account, transactionBytes }) {
 *     const signAndSendTransaction = useSignAndSendTransaction(account, 'trezoa:devnet');
 *     return (
 *         <button
 *             onClick={async () => {
 *                 try {
 *                     const { signature } = await signAndSendTransaction({
 *                         transaction: transactionBytes,
 *                     });
 *                     const base58TransactionSignature = getBase58Decoder().decode(signature);
 *                     window.alert(
 *                         `View transaction: https://explorer.trezoa.com/tx/${base58TransactionSignature}?cluster=devnet`,
 *                     );
 *                 } catch (e) {
 *                     console.error('Failed to send transaction', e);
 *                 }
 *             }}
 *         >
 *             Sign and Send Transaction
 *         </button>
 *     );
 * }
 * ```
 */
export function useSignAndSendTransaction<TWalletAccount extends UiWalletAccount>(
    uiWalletAccount: TWalletAccount,
    chain: OnlyTrezoaChains<TWalletAccount['chains']>,
): (input: Input) => Promise<Output>;
export function useSignAndSendTransaction<TWalletAccount extends UiWalletAccount>(
    uiWalletAccount: TWalletAccount,
    chain: `trezoa:${string}`,
): (input: Input) => Promise<Output>;
export function useSignAndSendTransaction<TWalletAccount extends UiWalletAccount>(
    uiWalletAccount: TWalletAccount,
    chain: `trezoa:${string}`,
): (input: Input) => Promise<Output> {
    const signAndSendTransactions = useSignAndSendTransactions(uiWalletAccount, chain);
    return useCallback(
        async input => {
            const [result] = await signAndSendTransactions(input);
            return result;
        },
        [signAndSendTransactions],
    );
}

function useSignAndSendTransactions<TWalletAccount extends UiWalletAccount>(
    uiWalletAccount: TWalletAccount,
    chain: `trezoa:${string}`,
): (...inputs: readonly Input[]) => Promise<readonly Output[]> {
    if (!uiWalletAccount.chains.includes(chain)) {
        throw new WalletStandardError(WALLET_STANDARD_ERROR__FEATURES__WALLET_ACCOUNT_CHAIN_UNSUPPORTED, {
            address: uiWalletAccount.address,
            chain,
            featureName: TrezoaSignAndSendTransaction,
            supportedChains: [...uiWalletAccount.chains],
            supportedFeatures: [...uiWalletAccount.features],
        });
    }
    const signAndSendTransactionFeature = getWalletAccountFeature(
        uiWalletAccount,
        TrezoaSignAndSendTransaction,
    ) as TrezoaSignAndSendTransactionFeature[typeof TrezoaSignAndSendTransaction];
    const account = getWalletAccountForUiWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED(uiWalletAccount);
    return useCallback(
        async (...inputs) => {
            const inputsWithChainAndAccount = inputs.map(({ options, ...rest }) => {
                const minContextSlot = options?.minContextSlot;
                return {
                    ...rest,
                    account,
                    chain,
                    ...(minContextSlot != null
                        ? {
                              options: {
                                  minContextSlot: Number(minContextSlot),
                              },
                          }
                        : null),
                };
            });
            const results = await signAndSendTransactionFeature.signAndSendTransaction(...inputsWithChainAndAccount);
            return results;
        },
        [account, chain, signAndSendTransactionFeature],
    );
}
