import {
    TrezoaSignAndSendTransaction,
    TrezoaSignTransaction,
    TrezoaSignTransactionFeature,
    TrezoaSignTransactionInput,
    TrezoaSignTransactionOutput,
} from '@trezoa/wallet-standard-features';
import {
    WALLET_STANDARD_ERROR__FEATURES__WALLET_ACCOUNT_CHAIN_UNSUPPORTED,
    WalletStandardError,
} from '@wallet-standard/errors';
import { getWalletAccountFeature, UiWalletAccount } from '@wallet-standard/ui';
import { getWalletAccountForUiWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from '@wallet-standard/ui-registry';
import { useCallback } from 'react';

import { OnlyTrezoaChains } from './chain';

type Input = Readonly<
    Omit<TrezoaSignTransactionInput, 'account' | 'chain' | 'options'> & {
        options?: Readonly<{
            minContextSlot?: bigint;
        }>;
    }
>;
type Output = TrezoaSignTransactionOutput;

/**
 * Use this to get a function capable of signing a serialized transaction with the private key of a
 * {@link UiWalletAccount}
 *
 * @param chain The identifier of the chain the transaction is destined for. Wallets may use this to
 * simulate the transaction for the user.
 *
 * @example
 * ```tsx
 * import { useSignTransaction } from '@trezoa/react';
 *
 * function SignTransactionButton({ account, transactionBytes }) {
 *     const signTransaction = useSignTransaction(account, 'trezoa:devnet');
 *     return (
 *         <button
 *             onClick={async () => {
 *                 try {
 *                     const { signedTransaction } = await signTransaction({
 *                         transaction: transactionBytes,
 *                     });
 *                     window.alert(`Signed transaction bytes: ${signedTransaction.toString()}`);
 *                 } catch (e) {
 *                     console.error('Failed to sign transaction', e);
 *                 }
 *             }}
 *         >
 *             Sign Transaction
 *         </button>
 *     );
 * }
 * ```
 */
export function useSignTransaction<TWalletAccount extends UiWalletAccount>(
    uiWalletAccount: TWalletAccount,
    chain: OnlyTrezoaChains<TWalletAccount['chains']>,
): (input: Input) => Promise<Output>;
export function useSignTransaction<TWalletAccount extends UiWalletAccount>(
    uiWalletAccount: TWalletAccount,
    chain: `trezoa:${string}`,
): (input: Input) => Promise<Output>;
export function useSignTransaction<TWalletAccount extends UiWalletAccount>(
    uiWalletAccount: TWalletAccount,
    chain: `trezoa:${string}`,
): (input: Input) => Promise<Output> {
    const signTransactions = useSignTransactions(uiWalletAccount, chain);
    return useCallback(
        async input => {
            const [result] = await signTransactions(input);
            return result;
        },
        [signTransactions],
    );
}

function useSignTransactions<TWalletAccount extends UiWalletAccount>(
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
    const signTransactionFeature = getWalletAccountFeature(
        uiWalletAccount,
        TrezoaSignTransaction,
    ) as TrezoaSignTransactionFeature[typeof TrezoaSignTransaction];
    const account = getWalletAccountForUiWalletAccount_DO_NOT_USE_OR_YOU_WILL_BE_FIRED(uiWalletAccount);
    return useCallback(
        async (...inputs) => {
            const inputsWithAccountAndChain = inputs.map(({ options, ...rest }) => {
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
            const results = await signTransactionFeature.signTransaction(...inputsWithAccountAndChain);
            return results;
        },
        [signTransactionFeature, account, chain],
    );
}
