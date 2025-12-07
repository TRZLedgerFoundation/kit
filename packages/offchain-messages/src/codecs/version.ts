import {
    combineCodec,
    FixedSizeCodec,
    FixedSizeDecoder,
    FixedSizeEncoder,
    transformDecoder,
    transformEncoder,
} from '@trezoa/codecs-core';
import { getU8Decoder, getU8Encoder } from '@trezoa/codecs-numbers';
import { TREZOA_ERROR__OFFCHAIN_MESSAGE__VERSION_NUMBER_NOT_SUPPORTED, TrezoaError } from '@trezoa/errors';

import { OffchainMessageVersion } from '../version';

function assertOffchainMessageVersion(putativeVersion: number): asserts putativeVersion is OffchainMessageVersion {
    if (putativeVersion !== 0) {
        throw new TrezoaError(TREZOA_ERROR__OFFCHAIN_MESSAGE__VERSION_NUMBER_NOT_SUPPORTED, {
            unsupportedVersion: putativeVersion,
        });
    }
}

/**
 * Returns an encoder that you can use to encode an {@link OffchainMessageVersion} to a byte array.
 */
export function getOffchainMessageVersionEncoder(): FixedSizeEncoder<OffchainMessageVersion, 1> {
    return transformEncoder(getU8Encoder(), version => {
        assertOffchainMessageVersion(version);
        return version;
    });
}

/**
 * Returns a decoder that you can use to decode a byte array representing an
 * {@link OffchainMessageVersion}.
 */
export function getOffchainMessageVersionDecoder(): FixedSizeDecoder<OffchainMessageVersion> {
    return transformDecoder(getU8Decoder(), value => {
        assertOffchainMessageVersion(value);
        return value;
    });
}

/**
 * Returns a codec that you can use to encode from or decode to an {@link OffchainMessageVersion}
 *
 * @see {@link getOffchainMessageVersionDecoder}
 * @see {@link getOffchainMessageVersionEncoder}
 */
export function getOffchainMessageVersionCodec(): FixedSizeCodec<OffchainMessageVersion> {
    return combineCodec(getOffchainMessageVersionEncoder(), getOffchainMessageVersionDecoder());
}
