import { createKeyPairFromBytes } from '@trezoa/keys';
import { Keypair } from '@trezoa/web3.js';

/**
 * Converts a legacy [Keypair](https://trz-ledger-foundation.github.io/trezoa-web3.js/classes/Keypair.html)
 * object to a native Ed25519 {@link CryptoKeyPair} object.
 *
 * @example
 * ```ts
 * import { fromLegacyKeypair } from '@trezoa/compat';
 *
 * const legacyKeyPair = Keypair.generate();
 * const { privateKey, publicKey } = await fromLegacyKeypair(legacyKeyPair);
 * ```
 */
export async function fromLegacyKeypair(keypair: Keypair, extractable?: boolean): Promise<CryptoKeyPair> {
    const bytes = new Uint8Array(64);
    bytes.set(keypair.secretKey);
    bytes.set(keypair.publicKey.toBytes(), /* offset */ 32);
    return await createKeyPairFromBytes(bytes, extractable);
}
