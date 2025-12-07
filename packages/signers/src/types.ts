import { Address } from '@trezoa/addresses';
import { SignatureBytes } from '@trezoa/keys';
import { Slot } from '@trezoa/rpc-types';

export type SignatureDictionary = Readonly<Record<Address, SignatureBytes>>;

/**
 * The base configuration object for all signers — including transaction and message signers.
 */
export type BaseSignerConfig = Readonly<{
    /**
     * An optional `AbortSignal` that can be used to cancel the signing process.
     *
     * @example
     * ```ts
     * import { generateKeyPairSigner } from '@trezoa/signers';
     *
     * const abortController = new AbortController();
     * const signer = await generateKeyPairSigner();
     * signer.signMessages([message], { abortSignal: abortController.signal });
     * abortController.abort();
     * ```
     */
    abortSignal?: AbortSignal;
}>;

/**
 * The base configuration object for transaction signers only.
 */
export interface BaseTransactionSignerConfig extends BaseSignerConfig {
    /**
     * Signers that simulate transactions (eg. wallets) might be interested in knowing which slot
     * was current when the transaction was prepared. They can use this information to ensure that
     * they don't run the simulation at too early a slot.
     */
    minContextSlot?: Slot;
}
