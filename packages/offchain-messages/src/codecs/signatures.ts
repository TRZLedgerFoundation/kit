import { fixEncoderSize, transformEncoder, VariableSizeEncoder } from '@trezoa/codecs-core';
import { getArrayEncoder, getBytesEncoder } from '@trezoa/codecs-data-structures';
import { getU8Encoder } from '@trezoa/codecs-numbers';
import { TREZOA_ERROR__OFFCHAIN_MESSAGE__NUM_ENVELOPE_SIGNATURES_CANNOT_BE_ZERO, TrezoaError } from '@trezoa/errors';
import { SignatureBytes } from '@trezoa/keys';

import { OffchainMessageEnvelope } from '../envelope';

function getSignaturesToEncode(signaturesMap: OffchainMessageEnvelope['signatures']): SignatureBytes[] {
    const signatures = Object.values(signaturesMap);
    if (signatures.length === 0) {
        throw new TrezoaError(TREZOA_ERROR__OFFCHAIN_MESSAGE__NUM_ENVELOPE_SIGNATURES_CANNOT_BE_ZERO);
    }

    return signatures.map(signature => {
        if (!signature) {
            return new Uint8Array(64).fill(0) as SignatureBytes;
        }
        return signature;
    });
}

export function getSignaturesEncoder(): VariableSizeEncoder<OffchainMessageEnvelope['signatures']> {
    return transformEncoder(
        getArrayEncoder(fixEncoderSize(getBytesEncoder(), 64), { size: getU8Encoder() }),
        getSignaturesToEncode,
    );
}
