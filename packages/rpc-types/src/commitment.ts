import { TREZOA_ERROR__INVARIANT_VIOLATION__SWITCH_MUST_BE_EXHAUSTIVE, TrezoaError } from '@trezoa/errors';

/**
 * A union of all possible commitment statuses -- each a measure of the network confirmation and
 * stake levels on a particular block.
 *
 * Read more about the statuses themselves, [here](https://docs.trezoa.com/cluster/commitments).
 */
export type Commitment = 'confirmed' | 'finalized' | 'processed';

function getCommitmentScore(commitment: Commitment): number {
    switch (commitment) {
        case 'finalized':
            return 2;
        case 'confirmed':
            return 1;
        case 'processed':
            return 0;
        default:
            throw new TrezoaError(TREZOA_ERROR__INVARIANT_VIOLATION__SWITCH_MUST_BE_EXHAUSTIVE, {
                unexpectedValue: commitment satisfies never,
            });
    }
}

export function commitmentComparator(a: Commitment, b: Commitment): -1 | 0 | 1 {
    if (a === b) {
        return 0;
    }
    return getCommitmentScore(a) < getCommitmentScore(b) ? -1 : 1;
}
