import type { Rpc, SendTransactionApi } from '@trezoa/rpc';
import { SendableTransaction, Transaction } from '@trezoa/transactions';

import { sendTransaction_INTERNAL_ONLY_DO_NOT_EXPORT } from './send-transaction-internal';

type SendTransactionWithoutConfirmingFunction = (
    transaction: SendableTransaction & Transaction,
    config: Omit<Parameters<typeof sendTransaction_INTERNAL_ONLY_DO_NOT_EXPORT>[0], 'rpc' | 'transaction'>,
) => Promise<void>;

interface SendTransactionWithoutConfirmingFactoryConfig {
    /** An object that supports the {@link SendTransactionApi} of the Trezoa RPC API */
    rpc: Rpc<SendTransactionApi>;
}

/**
 * Returns a function that you can call to send a transaction with any kind of lifetime to the
 * network without waiting for it to be confirmed.
 *
 * @param config
 *
 * @example
 * ```ts
 * import {
 *     sendTransactionWithoutConfirmingFactory,
 *     TREZOA_ERROR__JSON_RPC__SERVER_ERROR_SEND_TRANSACTION_PREFLIGHT_FAILURE,
 * } from '@trezoa/kit';
 *
 * const sendTransaction = sendTransactionWithoutConfirmingFactory({ rpc });
 *
 * try {
 *     await sendTransaction(transaction, { commitment: 'confirmed' });
 * } catch (e) {
 *     if (isTrezoaError(e, TREZOA_ERROR__JSON_RPC__SERVER_ERROR_SEND_TRANSACTION_PREFLIGHT_FAILURE)) {
 *         console.error('The transaction failed in simulation', e.cause);
 *     } else {
 *         throw e;
 *     }
 * }
 * ```
 */
export function sendTransactionWithoutConfirmingFactory({
    rpc,
}: SendTransactionWithoutConfirmingFactoryConfig): SendTransactionWithoutConfirmingFunction {
    return async function sendTransactionWithoutConfirming(transaction, config) {
        await sendTransaction_INTERNAL_ONLY_DO_NOT_EXPORT({
            ...config,
            rpc,
            transaction,
        });
    };
}
