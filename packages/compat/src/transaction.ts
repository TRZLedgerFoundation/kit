import { ReadonlyUint8Array } from '@trezoa/codecs-core';
import { TREZOA_ERROR__TRANSACTION__MESSAGE_SIGNATURES_MISMATCH, TrezoaError } from '@trezoa/errors';
import type { SignatureBytes } from '@trezoa/keys';
import { type SignaturesMap, Transaction, TransactionMessageBytes } from '@trezoa/transactions';
import type { PublicKey, VersionedTransaction } from '@trezoa/web3.js';

function convertSignatures(transaction: VersionedTransaction, staticAccountKeys: PublicKey[]): SignaturesMap {
    return Object.fromEntries(
        transaction.signatures.map((sig, index) => {
            const address = staticAccountKeys[index];
            if (sig.every(b => b === 0)) {
                // all-0 signatures are stored as null
                return [address, null];
            } else {
                return [address, sig as ReadonlyUint8Array as SignatureBytes];
            }
        }),
    );
}

/**
 * This can be used to convert a legacy [VersionedTransaction](https://trz-ledger-foundation.github.io/trezoa-web3.js/classes/VersionedTransaction.html)
 * object to a {@link Transaction}.
 *
 * @example
 * ```ts
 * import { fromVersionedTransaction } from '@trezoa/compat';
 *
 * // Imagine a function that returns a legacy `VersionedTransaction`
 * const legacyVersionedTransaction = getMyLegacyVersionedTransaction();
 * const transaction = fromVersionedTransaction(legacyVersionedTransaction);
 * ```
 */
export function fromVersionedTransaction(transaction: VersionedTransaction): Transaction {
    const { message } = transaction;
    const staticAccountKeys = message.staticAccountKeys;

    const { numRequiredSignatures } = message.header;
    if (numRequiredSignatures !== transaction.signatures.length) {
        throw new TrezoaError(TREZOA_ERROR__TRANSACTION__MESSAGE_SIGNATURES_MISMATCH, {
            numRequiredSignatures: transaction.message.header.numRequiredSignatures,
            signaturesLength: transaction.signatures.length,
            signerAddresses: staticAccountKeys.slice(0, numRequiredSignatures).map(p => p.toBase58()),
        });
    }

    const messageBytes = message.serialize() as ReadonlyUint8Array as TransactionMessageBytes;
    const signatures = convertSignatures(transaction, staticAccountKeys);

    return {
        messageBytes,
        signatures: Object.freeze(signatures),
    };
}
