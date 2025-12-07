import type { Address } from '@trezoa/addresses';
import type { ReadonlyUint8Array } from '@trezoa/codecs-core';
import type { SignatureBytes } from '@trezoa/keys';
import type { Brand, EncodedString } from '@trezoa/nominal-types';
import type { BaseTransactionMessage } from '@trezoa/transaction-messages';

import type { SetTransactionLifetimeFromTransactionMessage } from './lifetime';
import type { SetTransactionWithinSizeLimitFromTransactionMessage } from './transaction-size';

export type TransactionMessageBytes = Brand<ReadonlyUint8Array, 'TransactionMessageBytes'>;
export type TransactionMessageBytesBase64 = Brand<EncodedString<string, 'base64'>, 'TransactionMessageBytesBase64'>;

type OrderedMap<K extends string, V> = Record<K, V>;
export type SignaturesMap = OrderedMap<Address, SignatureBytes | null>;

export type Transaction = Readonly<{
    /** The bytes of a compiled transaction message, encoded in wire format */
    messageBytes: TransactionMessageBytes;
    /**
     * A map between the addresses of a transaction message's signers, and the 64-byte Ed25519
     * signature of the transaction's `messageBytes` by the private key associated with each.
     */
    signatures: SignaturesMap;
}>;

/**
 * Helper type that creates a `Transaction` type as narrow as possible
 * from the provided `BaseTransactionMessage` type.
 */
export type TransactionFromTransactionMessage<TTransactionMessage extends BaseTransactionMessage> =
    SetTransactionWithinSizeLimitFromTransactionMessage<
        SetTransactionLifetimeFromTransactionMessage<Transaction, TTransactionMessage>,
        TTransactionMessage
    >;
