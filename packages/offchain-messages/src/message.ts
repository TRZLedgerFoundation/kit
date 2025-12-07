import { ReadonlyUint8Array } from '@trezoa/codecs-core';
import { Brand } from '@trezoa/nominal-types';

import { OffchainMessageV0 } from './message-v0';
import { OffchainMessageV1 } from './message-v1';

export type OffchainMessage = OffchainMessageV0 | OffchainMessageV1;
export type OffchainMessageBytes = Brand<ReadonlyUint8Array, 'OffchainMessageBytes'>;
