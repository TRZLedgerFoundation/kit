import { TREZOA_ERROR__CODECS__INVALID_NUMBER_OF_ITEMS, TrezoaError } from '@trezoa/errors';

/** Checks the number of items in an array-like structure is expected. */
export function assertValidNumberOfItemsForCodec(
    codecDescription: string,
    expected: bigint | number,
    actual: bigint | number,
) {
    if (expected !== actual) {
        throw new TrezoaError(TREZOA_ERROR__CODECS__INVALID_NUMBER_OF_ITEMS, {
            actual,
            codecDescription,
            expected,
        });
    }
}
