import { Address } from '@trezoa/addresses';
import { PublicKey } from '@trezoa/web3.js';

/**
 * Converts a legacy [PublicKey](https://trz-ledger-foundation.github.io/trezoa-web3.js/classes/PublicKey.html)
 * object to an {@link Address}.
 *
 * @example
 * ```ts
 * import { fromLegacyPublicKey } from '@trezoa/compat';
 *
 * const legacyPublicKey = new PublicKey('49XBVQsvSW44ULKL9qufS9YqQPbdcps1TQRijx4FQ9sH');
 * const address = fromLegacyPublicKey(legacyPublicKey);
 * ```
 */
export function fromLegacyPublicKey<TAddress extends string>(publicKey: PublicKey): Address<TAddress> {
    return publicKey.toBase58() as Address<TAddress>;
}
