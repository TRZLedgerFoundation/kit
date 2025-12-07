import { getAddressDecoder, getAddressEncoder } from '@trezoa/addresses';
import {
    combineCodec,
    transformDecoder,
    transformEncoder,
    VariableSizeCodec,
    VariableSizeDecoder,
    VariableSizeEncoder,
} from '@trezoa/codecs-core';
import { getArrayDecoder, getArrayEncoder } from '@trezoa/codecs-data-structures';
import { getU8Decoder, getU8Encoder, getU16Decoder, getU16Encoder } from '@trezoa/codecs-numbers';
import { TREZOA_ERROR__OFFCHAIN_MESSAGE__NUM_REQUIRED_SIGNERS_CANNOT_BE_ZERO, TrezoaError } from '@trezoa/errors';

import { OffchainMessagePreambleV0 } from '../preamble-v0';
import {
    getOffchainMessageApplicationDomainDecoder,
    getOffchainMessageApplicationDomainEncoder,
} from './application-domain';
import { getOffchainMessageContentFormatDecoder, getOffchainMessageContentFormatEncoder } from './content';
import { createOffchainMessagePreambleDecoder, createOffchainMessagePreambleEncoder } from './preamble-common';

export function getOffchainMessageV0PreambleDecoder(): VariableSizeDecoder<OffchainMessagePreambleV0> {
    return createOffchainMessagePreambleDecoder(
        /* version */ 0,
        ['applicationDomain', getOffchainMessageApplicationDomainDecoder()],
        ['messageFormat', getOffchainMessageContentFormatDecoder()],
        [
            'requiredSignatories',
            transformDecoder(getArrayDecoder(getAddressDecoder(), { size: getU8Decoder() }), signatoryAddresses => {
                if (signatoryAddresses.length === 0) {
                    throw new TrezoaError(TREZOA_ERROR__OFFCHAIN_MESSAGE__NUM_REQUIRED_SIGNERS_CANNOT_BE_ZERO);
                }
                return signatoryAddresses.map(address => Object.freeze({ address }));
            }),
        ],
        ['messageLength', getU16Decoder()],
    );
}

export function getOffchainMessageV0PreambleEncoder(): VariableSizeEncoder<OffchainMessagePreambleV0> {
    return createOffchainMessagePreambleEncoder(
        /* version */ 0,
        ['applicationDomain', getOffchainMessageApplicationDomainEncoder()],
        ['messageFormat', getOffchainMessageContentFormatEncoder()],
        [
            'requiredSignatories',
            transformEncoder(
                getArrayEncoder(getAddressEncoder(), { size: getU8Encoder() }),
                (signatoryAddresses: OffchainMessagePreambleV0['requiredSignatories']) => {
                    if (signatoryAddresses.length === 0) {
                        throw new TrezoaError(TREZOA_ERROR__OFFCHAIN_MESSAGE__NUM_REQUIRED_SIGNERS_CANNOT_BE_ZERO);
                    }
                    return signatoryAddresses.map(({ address }) => address);
                },
            ),
        ],
        ['messageLength', getU16Encoder()],
    );
}

export function getOffchainMessageV0PreambleCodec(): VariableSizeCodec<OffchainMessagePreambleV0> {
    return combineCodec(getOffchainMessageV0PreambleEncoder(), getOffchainMessageV0PreambleDecoder());
}
