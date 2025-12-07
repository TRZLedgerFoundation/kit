import { Address } from '@trezoa/addresses';
import { TREZOA_ERROR__SIGNER__ADDRESS_CANNOT_HAVE_MULTIPLE_SIGNERS, TrezoaError } from '@trezoa/errors';

import { MessageSigner } from './message-signer';
import { TransactionSigner } from './transaction-signer';

/**
 * Removes all duplicated {@link MessageSigner | MessageSigners} and
 * {@link TransactionSigner | TransactionSigners} from a provided array
 * by comparing their {@link Address | addresses}.
 *
 * @internal
 */
export function deduplicateSigners<TSigner extends MessageSigner | TransactionSigner>(
    signers: readonly TSigner[],
): readonly TSigner[] {
    const deduplicated: Record<Address, TSigner> = {};
    signers.forEach(signer => {
        if (!deduplicated[signer.address]) {
            deduplicated[signer.address] = signer;
        } else if (deduplicated[signer.address] !== signer) {
            throw new TrezoaError(TREZOA_ERROR__SIGNER__ADDRESS_CANNOT_HAVE_MULTIPLE_SIGNERS, {
                address: signer.address,
            });
        }
    });
    return Object.values(deduplicated);
}
