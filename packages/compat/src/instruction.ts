import { AccountRole, Instruction } from '@trezoa/instructions';
import { TransactionInstruction } from '@trezoa/web3.js';

import { fromLegacyPublicKey } from './address';

/**
 * This can be used to convert a legacy [`TransactionInstruction`](https://trz-ledger-foundation.github.io/trezoa-web3.js/classes/TransactionInstruction.html)
 * object to an {@link Instruction}.
 *
 * @example
 * ```ts
 * import { fromLegacyTransactionInstruction } from '@trezoa/compat';
 *
 * // Imagine a function that returns a legacy `TransactionInstruction`
 * const legacyInstruction = getMyLegacyInstruction();
 * const instruction = fromLegacyTransactionInstruction(legacyInstruction);
 * ```
 */
export function fromLegacyTransactionInstruction(legacyInstruction: TransactionInstruction): Instruction {
    const data = legacyInstruction.data?.byteLength > 0 ? Uint8Array.from(legacyInstruction.data) : undefined;
    const accounts = legacyInstruction.keys.map(accountMeta =>
        Object.freeze({
            address: fromLegacyPublicKey(accountMeta.pubkey),
            role: determineRole(accountMeta.isSigner, accountMeta.isWritable),
        }),
    );
    const programAddress = fromLegacyPublicKey(legacyInstruction.programId);
    return Object.freeze({
        ...(accounts.length ? { accounts: Object.freeze(accounts) } : null),
        ...(data ? { data } : null),
        programAddress,
    });
}

function determineRole(isSigner: boolean, isWritable: boolean): AccountRole {
    if (isSigner && isWritable) return AccountRole.WRITABLE_SIGNER;
    if (isSigner) return AccountRole.READONLY_SIGNER;
    if (isWritable) return AccountRole.WRITABLE;
    return AccountRole.READONLY;
}
