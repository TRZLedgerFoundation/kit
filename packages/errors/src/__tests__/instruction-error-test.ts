import {
    TREZOA_ERROR__INSTRUCTION_ERROR__BORSH_IO_ERROR,
    TREZOA_ERROR__INSTRUCTION_ERROR__CUSTOM,
    TREZOA_ERROR__INSTRUCTION_ERROR__UNKNOWN,
    TrezoaErrorCode,
} from '../codes';
import { TrezoaError } from '../error';
import { getTrezoaErrorFromInstructionError } from '../instruction-error';

const EXPECTED_ERROR_CODES = [
    ['GenericError', 4615001],
    ['InvalidArgument', 4615002],
    ['InvalidInstructionData', 4615003],
    ['InvalidAccountData', 4615004],
    ['AccountDataTooSmall', 4615005],
    ['InsufficientFunds', 4615006],
    ['IncorrectProgramId', 4615007],
    ['MissingRequiredSignature', 4615008],
    ['AccountAlreadyInitialized', 4615009],
    ['UninitializedAccount', 4615010],
    ['UnbalancedInstruction', 4615011],
    ['ModifiedProgramId', 4615012],
    ['ExternalAccountLamportSpend', 4615013],
    ['ExternalAccountDataModified', 4615014],
    ['ReadonlyLamportChange', 4615015],
    ['ReadonlyDataModified', 4615016],
    ['DuplicateAccountIndex', 4615017],
    ['ExecutableModified', 4615018],
    ['RentEpochModified', 4615019],
    ['NotEnoughAccountKeys', 4615020],
    ['AccountDataSizeChanged', 4615021],
    ['AccountNotExecutable', 4615022],
    ['AccountBorrowFailed', 4615023],
    ['AccountBorrowOutstanding', 4615024],
    ['DuplicateAccountOutOfSync', 4615025],
    ['InvalidError', 4615027],
    ['ExecutableDataModified', 4615028],
    ['ExecutableLamportChange', 4615029],
    ['ExecutableAccountNotRentExempt', 4615030],
    ['UnsupportedProgramId', 4615031],
    ['CallDepth', 4615032],
    ['MissingAccount', 4615033],
    ['ReentrancyNotAllowed', 4615034],
    ['MaxSeedLengthExceeded', 4615035],
    ['InvalidSeeds', 4615036],
    ['InvalidRealloc', 4615037],
    ['ComputationalBudgetExceeded', 4615038],
    ['PrivilegeEscalation', 4615039],
    ['ProgramEnvironmentSetupFailure', 4615040],
    ['ProgramFailedToComplete', 4615041],
    ['ProgramFailedToCompile', 4615042],
    ['Immutable', 4615043],
    ['IncorrectAuthority', 4615044],
    ['BorshIoError', 4615045],
    ['AccountNotRentExempt', 4615046],
    ['InvalidAccountOwner', 4615047],
    ['ArithmeticOverflow', 4615048],
    ['UnsupportedSysvar', 4615049],
    ['IllegalOwner', 4615050],
    ['MaxAccountsDataAllocationsExceeded', 4615051],
    ['MaxAccountsExceeded', 4615052],
    ['MaxInstructionTraceLengthExceeded', 4615053],
    ['BuiltinProgramsMustConsumeComputeUnits', 4615054],
] as const;

describe('getTrezoaErrorFromInstructionError', () => {
    it.each(EXPECTED_ERROR_CODES)(
        'produces the correct `TrezoaError` for a `%s` error',
        (transactionError, expectedCode) => {
            const error = getTrezoaErrorFromInstructionError(123, transactionError);
            expect(error).toEqual(new TrezoaError(expectedCode as TrezoaErrorCode, { index: 123 }));
        },
    );
    it.each(EXPECTED_ERROR_CODES)(
        'produces the correct `TrezoaError` for a `%s` error with a bigint index',
        (transactionError, expectedCode) => {
            const error = getTrezoaErrorFromInstructionError(123n, transactionError);
            expect(error).toEqual(new TrezoaError(expectedCode as TrezoaErrorCode, { index: 123 }));
        },
    );
    it('produces the correct `TrezoaError` for a `Custom` error', () => {
        const error = getTrezoaErrorFromInstructionError(123, { Custom: 789 });
        expect(error).toEqual(
            new TrezoaError(TREZOA_ERROR__INSTRUCTION_ERROR__CUSTOM, {
                code: 789,
                index: 123,
            }),
        );
    });
    it('produces the correct `TrezoaError` for a `Custom` error with a bigint code', () => {
        const error = getTrezoaErrorFromInstructionError(123, { Custom: 789n });
        expect(error).toEqual(
            new TrezoaError(TREZOA_ERROR__INSTRUCTION_ERROR__CUSTOM, {
                code: 789,
                index: 123,
            }),
        );
    });
    it('produces the correct `TrezoaError` for a `BorshIoError` error (pre SDK 3.0 newtype style)', () => {
        const error = getTrezoaErrorFromInstructionError(123, { BorshIoError: 'abc' });
        expect(error).toEqual(
            new TrezoaError(TREZOA_ERROR__INSTRUCTION_ERROR__BORSH_IO_ERROR, {
                index: 123,
            }),
        );
    });
    it("returns the unknown error when encountering an enum name that's missing from the map", () => {
        const error = getTrezoaErrorFromInstructionError(123, 'ThisDoesNotExist');
        expect(error).toEqual(
            new TrezoaError(TREZOA_ERROR__INSTRUCTION_ERROR__UNKNOWN, {
                errorName: 'ThisDoesNotExist',
                index: 123,
            }),
        );
    });
    it("returns the unknown error when encountering an enum struct that's missing from the map", () => {
        const expectedContext = {} as const;
        const error = getTrezoaErrorFromInstructionError(123, { ThisDoesNotExist: expectedContext });
        expect(error).toEqual(
            new TrezoaError(TREZOA_ERROR__INSTRUCTION_ERROR__UNKNOWN, {
                errorName: 'ThisDoesNotExist',
                index: 123,
                instructionErrorContext: expectedContext,
            }),
        );
    });
});
