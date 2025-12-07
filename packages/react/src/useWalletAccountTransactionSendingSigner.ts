import { address } from '@trezoa/addresses';
import { TREZOA_ERROR__SIGNER__WALLET_MULTISIGN_UNIMPLEMENTED, TrezoaError } from '@trezoa/errors';
import { SignatureBytes } from '@trezoa/keys';
import { getAbortablePromise } from '@trezoa/promises';
import { TransactionSendingSigner } from '@trezoa/signers';
import { getTransactionEncoder } from '@trezoa/transactions';
import { UiWalletAccount } from '@wallet-standard/ui';
import { useMemo, useRef } from 'react';

import { OnlyTrezoaChains } from './chain';
import { useSignAndSendTransaction } from './useSignAndSendTransaction';

/**
 * Use this to get a {@link TransactionSendingSigner} capable of signing a serialized transaction
 * with the private key of a {@link UiWalletAccount} and sending it to the network for processing.
 *
 * @param chain The identifier of the chain the transaction is destined for. Wallets may use this to
 * simulate the transaction for the user.
 *
 * @example
 * ```tsx
 * import { useWalletAccountTransactionSendingSigner } from '@trezoa/react';
 * import {
 *     appendTransactionMessageInstruction,
 *     createTrezoaRpc,
 *     getBase58Decoder,
 *     pipe,
 *     setTransactionMessageFeePayerSigner,
 *     setTransactionMessageLifetimeUsingBlockhash,
 *     signAndSendTransactionMessageWithSigners,
 * } from '@trezoa/kit';
 *
 * function RecordMemoButton({ account, rpc, text }) {
 *     const signer = useWalletAccountTransactionSendingSigner(account, 'trezoa:devnet');
 *     return (
 *         <button
 *             onClick={async () => {
 *                 try {
 *                     const { value: latestBlockhash } = await createTrezoaRpc('https://api.devnet.trezoa.com')
 *                         .getLatestBlockhash()
 *                         .send();
 *                     const message = pipe(
 *                         createTransactionMessage({ version: 'legacy' }),
 *                         m => setTransactionMessageFeePayerSigner(signer, m),
 *                         m => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, m),
 *                         m => appendTransactionMessageInstruction(getAddMemoInstruction({ memo: text }), m),
 *                     );
 *                     const signatureBytes = await signAndSendTransactionMessageWithSigners(message);
 *                     const base58Signature = getBase58Decoder().decode(signature);
 *                     window.alert(`View transaction: https://explorer.trezoa.com/tx/${base58Signature}?cluster=devnet`);
 *                 } catch (e) {
 *                     console.error('Failed to record memo', e);
 *                 }
 *             }}
 *         >
 *             Record Memo
 *         </button>
 *     );
 * }
 * ```
 */
export function useWalletAccountTransactionSendingSigner<TWalletAccount extends UiWalletAccount>(
    uiWalletAccount: TWalletAccount,
    chain: OnlyTrezoaChains<TWalletAccount['chains']>,
): TransactionSendingSigner<TWalletAccount['address']>;
export function useWalletAccountTransactionSendingSigner<TWalletAccount extends UiWalletAccount>(
    uiWalletAccount: TWalletAccount,
    chain: `trezoa:${string}`,
): TransactionSendingSigner<TWalletAccount['address']>;
export function useWalletAccountTransactionSendingSigner<TWalletAccount extends UiWalletAccount>(
    uiWalletAccount: TWalletAccount,
    chain: `trezoa:${string}`,
): TransactionSendingSigner<TWalletAccount['address']> {
    const encoderRef = useRef<ReturnType<typeof getTransactionEncoder> | null>(null);
    const signAndSendTransaction = useSignAndSendTransaction(uiWalletAccount, chain);
    return useMemo(
        () => ({
            address: address(uiWalletAccount.address),
            async signAndSendTransactions(transactions, config = {}) {
                const { abortSignal, ...options } = config;
                abortSignal?.throwIfAborted();
                const transactionEncoder = (encoderRef.current ||= getTransactionEncoder());
                if (transactions.length > 1) {
                    throw new TrezoaError(TREZOA_ERROR__SIGNER__WALLET_MULTISIGN_UNIMPLEMENTED);
                }
                if (transactions.length === 0) {
                    return [];
                }
                const [transaction] = transactions;
                const wireTransactionBytes = transactionEncoder.encode(transaction);
                const inputWithOptions = {
                    ...options,
                    transaction: wireTransactionBytes as Uint8Array,
                };
                const { signature } = await getAbortablePromise(signAndSendTransaction(inputWithOptions), abortSignal);
                return Object.freeze([signature as SignatureBytes]);
            },
        }),
        [signAndSendTransaction, uiWalletAccount.address],
    );
}
