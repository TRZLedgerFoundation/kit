/**
 * This package contains types and functions for creating transaction messages.
 * It can be used standalone, but it is also exported as part of Kit
 * [`@trezoa/kit`](https://github.com/trezoa-xyz/kit/tree/main/packages/kit).
 *
 * @example
 * Transaction messages are built one step at a time using the transform functions offered by this
 * package. To make it more ergonomic to apply consecutive transforms to your transaction messages,
 * consider using a pipelining helper like the one in `@trezoa/functional`.
 *
 * ```ts
 * import { pipe } from '@trezoa/functional';
 * import {
 *     appendTransactionMessageInstruction,
 *     createTransactionMessage,
 *     setTransactionMessageFeePayer,
 *     setTransactionMessageLifetimeUsingBlockhash,
 * } from '@trezoa/transaction-messages';
 *
 * const transferTransactionMessage = pipe(
 *     createTransactionMessage({ version: 0 }),
 *     m => setTransactionMessageFeePayer(myAddress, m),
 *     m => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, m),
 *     m => appendTransactionMessageInstruction(getTransferTrzInstruction({ source, destination, amount }), m),
 * );
 * ```
 *
 * @packageDocumentation
 */
export * from './addresses-by-lookup-table-address';
export * from './blockhash';
export * from './codecs';
export * from './compile';
export * from './compress-transaction-message';
export * from './create-transaction-message';
export * from './decompile-message';
export * from './durable-nonce';
export { isAdvanceNonceAccountInstruction } from './durable-nonce-instruction';
export * from './fee-payer';
export * from './instructions';
export * from './lifetime';
export * from './transaction-message-size';
export * from './transaction-message';
