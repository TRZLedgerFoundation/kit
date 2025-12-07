import { TREZOA_ERROR__INSTRUCTION_ERROR__CUSTOM, TREZOA_ERROR__INSTRUCTION_ERROR__UNKNOWN } from './codes';
import { TrezoaError } from './error';
import { getTrezoaErrorFromRpcError } from './rpc-enum-errors';

const ORDERED_ERROR_NAMES = [
    // Keep synced with RPC source: https://github.com/trezoa-xyz/solana-sdk/blob/master/instruction-error/src/lib.rs
    // If this list ever gets too large, consider implementing a compression strategy like this:
    // https://gist.github.com/steveluscher/aaa7cbbb5433b1197983908a40860c47
    'GenericError',
    'InvalidArgument',
    'InvalidInstructionData',
    'InvalidAccountData',
    'AccountDataTooSmall',
    'InsufficientFunds',
    'IncorrectProgramId',
    'MissingRequiredSignature',
    'AccountAlreadyInitialized',
    'UninitializedAccount',
    'UnbalancedInstruction',
    'ModifiedProgramId',
    'ExternalAccountLamportSpend',
    'ExternalAccountDataModified',
    'ReadonlyLamportChange',
    'ReadonlyDataModified',
    'DuplicateAccountIndex',
    'ExecutableModified',
    'RentEpochModified',
    'NotEnoughAccountKeys',
    'AccountDataSizeChanged',
    'AccountNotExecutable',
    'AccountBorrowFailed',
    'AccountBorrowOutstanding',
    'DuplicateAccountOutOfSync',
    'Custom',
    'InvalidError',
    'ExecutableDataModified',
    'ExecutableLamportChange',
    'ExecutableAccountNotRentExempt',
    'UnsupportedProgramId',
    'CallDepth',
    'MissingAccount',
    'ReentrancyNotAllowed',
    'MaxSeedLengthExceeded',
    'InvalidSeeds',
    'InvalidRealloc',
    'ComputationalBudgetExceeded',
    'PrivilegeEscalation',
    'ProgramEnvironmentSetupFailure',
    'ProgramFailedToComplete',
    'ProgramFailedToCompile',
    'Immutable',
    'IncorrectAuthority',
    'BorshIoError',
    'AccountNotRentExempt',
    'InvalidAccountOwner',
    'ArithmeticOverflow',
    'UnsupportedSysvar',
    'IllegalOwner',
    'MaxAccountsDataAllocationsExceeded',
    'MaxAccountsExceeded',
    'MaxInstructionTraceLengthExceeded',
    'BuiltinProgramsMustConsumeComputeUnits',
];

export function getTrezoaErrorFromInstructionError(
    /**
     * The index of the instruction inside the transaction.
     */
    index: bigint | number,
    instructionError: string | { [key: string]: unknown },
): TrezoaError {
    const numberIndex = Number(index);
    return getTrezoaErrorFromRpcError(
        {
            errorCodeBaseOffset: 4615001,
            getErrorContext(errorCode, rpcErrorName, rpcErrorContext) {
                if (errorCode === TREZOA_ERROR__INSTRUCTION_ERROR__UNKNOWN) {
                    return {
                        errorName: rpcErrorName,
                        index: numberIndex,
                        ...(rpcErrorContext !== undefined ? { instructionErrorContext: rpcErrorContext } : null),
                    };
                } else if (errorCode === TREZOA_ERROR__INSTRUCTION_ERROR__CUSTOM) {
                    return {
                        code: Number(rpcErrorContext as bigint | number),
                        index: numberIndex,
                    };
                }
                return { index: numberIndex };
            },
            orderedErrorNames: ORDERED_ERROR_NAMES,
            rpcEnumError: instructionError,
        },
        getTrezoaErrorFromInstructionError,
    );
}
