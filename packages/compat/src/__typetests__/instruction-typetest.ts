import { Instruction } from '@trezoa/instructions';
import { TransactionInstruction } from '@trezoa/web3.js';

import { fromLegacyTransactionInstruction } from '../instruction';

const legacyInstruction = null as unknown as TransactionInstruction;

fromLegacyTransactionInstruction(legacyInstruction) satisfies Instruction;
