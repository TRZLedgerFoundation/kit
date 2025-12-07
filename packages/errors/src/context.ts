/**
 * To add a new error, follow the instructions at
 * https://github.com/trezoa-xyz/kit/tree/main/packages/errors/#adding-a-new-error
 *
 * @privateRemarks
 * WARNING:
 *   - Don't change or remove members of an error's context.
 */
import {
    TREZOA_ERROR__ACCOUNTS__ACCOUNT_NOT_FOUND,
    TREZOA_ERROR__ACCOUNTS__EXPECTED_ALL_ACCOUNTS_TO_BE_DECODED,
    TREZOA_ERROR__ACCOUNTS__EXPECTED_DECODED_ACCOUNT,
    TREZOA_ERROR__ACCOUNTS__FAILED_TO_DECODE_ACCOUNT,
    TREZOA_ERROR__ACCOUNTS__ONE_OR_MORE_ACCOUNTS_NOT_FOUND,
    TREZOA_ERROR__ADDRESSES__INVALID_BASE58_ENCODED_ADDRESS,
    TREZOA_ERROR__ADDRESSES__INVALID_BYTE_LENGTH,
    TREZOA_ERROR__ADDRESSES__MAX_NUMBER_OF_PDA_SEEDS_EXCEEDED,
    TREZOA_ERROR__ADDRESSES__MAX_PDA_SEED_LENGTH_EXCEEDED,
    TREZOA_ERROR__ADDRESSES__PDA_BUMP_SEED_OUT_OF_RANGE,
    TREZOA_ERROR__ADDRESSES__STRING_LENGTH_OUT_OF_RANGE,
    TREZOA_ERROR__BLOCK_HEIGHT_EXCEEDED,
    TREZOA_ERROR__BLOCKHASH_STRING_LENGTH_OUT_OF_RANGE,
    TREZOA_ERROR__CODECS__CANNOT_DECODE_EMPTY_BYTE_ARRAY,
    TREZOA_ERROR__CODECS__CANNOT_USE_LEXICAL_VALUES_AS_ENUM_DISCRIMINATORS,
    TREZOA_ERROR__CODECS__ENCODED_BYTES_MUST_NOT_INCLUDE_SENTINEL,
    TREZOA_ERROR__CODECS__ENCODER_DECODER_FIXED_SIZE_MISMATCH,
    TREZOA_ERROR__CODECS__ENCODER_DECODER_MAX_SIZE_MISMATCH,
    TREZOA_ERROR__CODECS__ENUM_DISCRIMINATOR_OUT_OF_RANGE,
    TREZOA_ERROR__CODECS__EXPECTED_DECODER_TO_CONSUME_ENTIRE_BYTE_ARRAY,
    TREZOA_ERROR__CODECS__EXPECTED_POSITIVE_BYTE_LENGTH,
    TREZOA_ERROR__CODECS__EXPECTED_ZERO_VALUE_TO_MATCH_ITEM_FIXED_SIZE,
    TREZOA_ERROR__CODECS__INVALID_BYTE_LENGTH,
    TREZOA_ERROR__CODECS__INVALID_CONSTANT,
    TREZOA_ERROR__CODECS__INVALID_DISCRIMINATED_UNION_VARIANT,
    TREZOA_ERROR__CODECS__INVALID_ENUM_VARIANT,
    TREZOA_ERROR__CODECS__INVALID_LITERAL_UNION_VARIANT,
    TREZOA_ERROR__CODECS__INVALID_NUMBER_OF_ITEMS,
    TREZOA_ERROR__CODECS__INVALID_STRING_FOR_BASE,
    TREZOA_ERROR__CODECS__LITERAL_UNION_DISCRIMINATOR_OUT_OF_RANGE,
    TREZOA_ERROR__CODECS__NUMBER_OUT_OF_RANGE,
    TREZOA_ERROR__CODECS__OFFSET_OUT_OF_RANGE,
    TREZOA_ERROR__CODECS__SENTINEL_MISSING_IN_DECODED_BYTES,
    TREZOA_ERROR__CODECS__UNION_VARIANT_OUT_OF_RANGE,
    TREZOA_ERROR__INSTRUCTION__EXPECTED_TO_HAVE_ACCOUNTS,
    TREZOA_ERROR__INSTRUCTION__EXPECTED_TO_HAVE_DATA,
    TREZOA_ERROR__INSTRUCTION__PROGRAM_ID_MISMATCH,
    TREZOA_ERROR__INSTRUCTION_ERROR__ACCOUNT_ALREADY_INITIALIZED,
    TREZOA_ERROR__INSTRUCTION_ERROR__ACCOUNT_BORROW_FAILED,
    TREZOA_ERROR__INSTRUCTION_ERROR__ACCOUNT_BORROW_OUTSTANDING,
    TREZOA_ERROR__INSTRUCTION_ERROR__ACCOUNT_DATA_SIZE_CHANGED,
    TREZOA_ERROR__INSTRUCTION_ERROR__ACCOUNT_DATA_TOO_SMALL,
    TREZOA_ERROR__INSTRUCTION_ERROR__ACCOUNT_NOT_EXECUTABLE,
    TREZOA_ERROR__INSTRUCTION_ERROR__ACCOUNT_NOT_RENT_EXEMPT,
    TREZOA_ERROR__INSTRUCTION_ERROR__ARITHMETIC_OVERFLOW,
    TREZOA_ERROR__INSTRUCTION_ERROR__BORSH_IO_ERROR,
    TREZOA_ERROR__INSTRUCTION_ERROR__BUILTIN_PROGRAMS_MUST_CONSUME_COMPUTE_UNITS,
    TREZOA_ERROR__INSTRUCTION_ERROR__CALL_DEPTH,
    TREZOA_ERROR__INSTRUCTION_ERROR__COMPUTATIONAL_BUDGET_EXCEEDED,
    TREZOA_ERROR__INSTRUCTION_ERROR__CUSTOM,
    TREZOA_ERROR__INSTRUCTION_ERROR__DUPLICATE_ACCOUNT_INDEX,
    TREZOA_ERROR__INSTRUCTION_ERROR__DUPLICATE_ACCOUNT_OUT_OF_SYNC,
    TREZOA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_ACCOUNT_NOT_RENT_EXEMPT,
    TREZOA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_DATA_MODIFIED,
    TREZOA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_LAMPORT_CHANGE,
    TREZOA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_MODIFIED,
    TREZOA_ERROR__INSTRUCTION_ERROR__EXTERNAL_ACCOUNT_DATA_MODIFIED,
    TREZOA_ERROR__INSTRUCTION_ERROR__EXTERNAL_ACCOUNT_LAMPORT_SPEND,
    TREZOA_ERROR__INSTRUCTION_ERROR__GENERIC_ERROR,
    TREZOA_ERROR__INSTRUCTION_ERROR__ILLEGAL_OWNER,
    TREZOA_ERROR__INSTRUCTION_ERROR__IMMUTABLE,
    TREZOA_ERROR__INSTRUCTION_ERROR__INCORRECT_AUTHORITY,
    TREZOA_ERROR__INSTRUCTION_ERROR__INCORRECT_PROGRAM_ID,
    TREZOA_ERROR__INSTRUCTION_ERROR__INSUFFICIENT_FUNDS,
    TREZOA_ERROR__INSTRUCTION_ERROR__INVALID_ACCOUNT_DATA,
    TREZOA_ERROR__INSTRUCTION_ERROR__INVALID_ACCOUNT_OWNER,
    TREZOA_ERROR__INSTRUCTION_ERROR__INVALID_ARGUMENT,
    TREZOA_ERROR__INSTRUCTION_ERROR__INVALID_ERROR,
    TREZOA_ERROR__INSTRUCTION_ERROR__INVALID_INSTRUCTION_DATA,
    TREZOA_ERROR__INSTRUCTION_ERROR__INVALID_REALLOC,
    TREZOA_ERROR__INSTRUCTION_ERROR__INVALID_SEEDS,
    TREZOA_ERROR__INSTRUCTION_ERROR__MAX_ACCOUNTS_DATA_ALLOCATIONS_EXCEEDED,
    TREZOA_ERROR__INSTRUCTION_ERROR__MAX_ACCOUNTS_EXCEEDED,
    TREZOA_ERROR__INSTRUCTION_ERROR__MAX_INSTRUCTION_TRACE_LENGTH_EXCEEDED,
    TREZOA_ERROR__INSTRUCTION_ERROR__MAX_SEED_LENGTH_EXCEEDED,
    TREZOA_ERROR__INSTRUCTION_ERROR__MISSING_ACCOUNT,
    TREZOA_ERROR__INSTRUCTION_ERROR__MISSING_REQUIRED_SIGNATURE,
    TREZOA_ERROR__INSTRUCTION_ERROR__MODIFIED_PROGRAM_ID,
    TREZOA_ERROR__INSTRUCTION_ERROR__NOT_ENOUGH_ACCOUNT_KEYS,
    TREZOA_ERROR__INSTRUCTION_ERROR__PRIVILEGE_ESCALATION,
    TREZOA_ERROR__INSTRUCTION_ERROR__PROGRAM_ENVIRONMENT_SETUP_FAILURE,
    TREZOA_ERROR__INSTRUCTION_ERROR__PROGRAM_FAILED_TO_COMPILE,
    TREZOA_ERROR__INSTRUCTION_ERROR__PROGRAM_FAILED_TO_COMPLETE,
    TREZOA_ERROR__INSTRUCTION_ERROR__READONLY_DATA_MODIFIED,
    TREZOA_ERROR__INSTRUCTION_ERROR__READONLY_LAMPORT_CHANGE,
    TREZOA_ERROR__INSTRUCTION_ERROR__REENTRANCY_NOT_ALLOWED,
    TREZOA_ERROR__INSTRUCTION_ERROR__RENT_EPOCH_MODIFIED,
    TREZOA_ERROR__INSTRUCTION_ERROR__UNBALANCED_INSTRUCTION,
    TREZOA_ERROR__INSTRUCTION_ERROR__UNINITIALIZED_ACCOUNT,
    TREZOA_ERROR__INSTRUCTION_ERROR__UNKNOWN,
    TREZOA_ERROR__INSTRUCTION_ERROR__UNSUPPORTED_PROGRAM_ID,
    TREZOA_ERROR__INSTRUCTION_ERROR__UNSUPPORTED_SYSVAR,
    TREZOA_ERROR__INSTRUCTION_PLANS__FAILED_TO_EXECUTE_TRANSACTION_PLAN,
    TREZOA_ERROR__INSTRUCTION_PLANS__MESSAGE_CANNOT_ACCOMMODATE_PLAN,
    TREZOA_ERROR__INVALID_BLOCKHASH_BYTE_LENGTH,
    TREZOA_ERROR__INVALID_NONCE,
    TREZOA_ERROR__INVARIANT_VIOLATION__CACHED_ABORTABLE_ITERABLE_CACHE_ENTRY_MISSING,
    TREZOA_ERROR__INVARIANT_VIOLATION__DATA_PUBLISHER_CHANNEL_UNIMPLEMENTED,
    TREZOA_ERROR__INVARIANT_VIOLATION__INVALID_INSTRUCTION_PLAN_KIND,
    TREZOA_ERROR__INVARIANT_VIOLATION__INVALID_TRANSACTION_PLAN_KIND,
    TREZOA_ERROR__INVARIANT_VIOLATION__SWITCH_MUST_BE_EXHAUSTIVE,
    TREZOA_ERROR__JSON_RPC__INTERNAL_ERROR,
    TREZOA_ERROR__JSON_RPC__INVALID_PARAMS,
    TREZOA_ERROR__JSON_RPC__INVALID_REQUEST,
    TREZOA_ERROR__JSON_RPC__METHOD_NOT_FOUND,
    TREZOA_ERROR__JSON_RPC__PARSE_ERROR,
    TREZOA_ERROR__JSON_RPC__SCAN_ERROR,
    TREZOA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_CLEANED_UP,
    TREZOA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_NOT_AVAILABLE,
    TREZOA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_STATUS_NOT_AVAILABLE_YET,
    TREZOA_ERROR__JSON_RPC__SERVER_ERROR_EPOCH_REWARDS_PERIOD_ACTIVE,
    TREZOA_ERROR__JSON_RPC__SERVER_ERROR_KEY_EXCLUDED_FROM_SECONDARY_INDEX,
    TREZOA_ERROR__JSON_RPC__SERVER_ERROR_LONG_TERM_STORAGE_SLOT_SKIPPED,
    TREZOA_ERROR__JSON_RPC__SERVER_ERROR_MIN_CONTEXT_SLOT_NOT_REACHED,
    TREZOA_ERROR__JSON_RPC__SERVER_ERROR_NODE_UNHEALTHY,
    TREZOA_ERROR__JSON_RPC__SERVER_ERROR_SEND_TRANSACTION_PREFLIGHT_FAILURE,
    TREZOA_ERROR__JSON_RPC__SERVER_ERROR_SLOT_NOT_EPOCH_BOUNDARY,
    TREZOA_ERROR__JSON_RPC__SERVER_ERROR_SLOT_SKIPPED,
    TREZOA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_PRECOMPILE_VERIFICATION_FAILURE,
    TREZOA_ERROR__JSON_RPC__SERVER_ERROR_UNSUPPORTED_TRANSACTION_VERSION,
    TREZOA_ERROR__KEYS__INVALID_KEY_PAIR_BYTE_LENGTH,
    TREZOA_ERROR__KEYS__INVALID_PRIVATE_KEY_BYTE_LENGTH,
    TREZOA_ERROR__KEYS__INVALID_SIGNATURE_BYTE_LENGTH,
    TREZOA_ERROR__KEYS__SIGNATURE_STRING_LENGTH_OUT_OF_RANGE,
    TREZOA_ERROR__MALFORMED_BIGINT_STRING,
    TREZOA_ERROR__MALFORMED_JSON_RPC_ERROR,
    TREZOA_ERROR__MALFORMED_NUMBER_STRING,
    TREZOA_ERROR__NONCE_ACCOUNT_NOT_FOUND,
    TREZOA_ERROR__OFFCHAIN_MESSAGE__ADDRESSES_CANNOT_SIGN_OFFCHAIN_MESSAGE,
    TREZOA_ERROR__OFFCHAIN_MESSAGE__APPLICATION_DOMAIN_STRING_LENGTH_OUT_OF_RANGE,
    TREZOA_ERROR__OFFCHAIN_MESSAGE__ENVELOPE_SIGNERS_MISMATCH,
    TREZOA_ERROR__OFFCHAIN_MESSAGE__INVALID_APPLICATION_DOMAIN_BYTE_LENGTH,
    TREZOA_ERROR__OFFCHAIN_MESSAGE__MAXIMUM_LENGTH_EXCEEDED,
    TREZOA_ERROR__OFFCHAIN_MESSAGE__MESSAGE_FORMAT_MISMATCH,
    TREZOA_ERROR__OFFCHAIN_MESSAGE__MESSAGE_LENGTH_MISMATCH,
    TREZOA_ERROR__OFFCHAIN_MESSAGE__NUM_SIGNATURES_MISMATCH,
    TREZOA_ERROR__OFFCHAIN_MESSAGE__SIGNATURE_VERIFICATION_FAILURE,
    TREZOA_ERROR__OFFCHAIN_MESSAGE__SIGNATURES_MISSING,
    TREZOA_ERROR__OFFCHAIN_MESSAGE__UNEXPECTED_VERSION,
    TREZOA_ERROR__OFFCHAIN_MESSAGE__VERSION_NUMBER_NOT_SUPPORTED,
    TREZOA_ERROR__RPC__API_PLAN_MISSING_FOR_RPC_METHOD,
    TREZOA_ERROR__RPC__INTEGER_OVERFLOW,
    TREZOA_ERROR__RPC__TRANSPORT_HTTP_ERROR,
    TREZOA_ERROR__RPC__TRANSPORT_HTTP_HEADER_FORBIDDEN,
    TREZOA_ERROR__RPC_SUBSCRIPTIONS__CANNOT_CREATE_SUBSCRIPTION_PLAN,
    TREZOA_ERROR__RPC_SUBSCRIPTIONS__CHANNEL_FAILED_TO_CONNECT,
    TREZOA_ERROR__SIGNER__ADDRESS_CANNOT_HAVE_MULTIPLE_SIGNERS,
    TREZOA_ERROR__SIGNER__EXPECTED_KEY_PAIR_SIGNER,
    TREZOA_ERROR__SIGNER__EXPECTED_MESSAGE_MODIFYING_SIGNER,
    TREZOA_ERROR__SIGNER__EXPECTED_MESSAGE_PARTIAL_SIGNER,
    TREZOA_ERROR__SIGNER__EXPECTED_MESSAGE_SIGNER,
    TREZOA_ERROR__SIGNER__EXPECTED_TRANSACTION_MODIFYING_SIGNER,
    TREZOA_ERROR__SIGNER__EXPECTED_TRANSACTION_PARTIAL_SIGNER,
    TREZOA_ERROR__SIGNER__EXPECTED_TRANSACTION_SENDING_SIGNER,
    TREZOA_ERROR__SIGNER__EXPECTED_TRANSACTION_SIGNER,
    TREZOA_ERROR__SUBTLE_CRYPTO__CANNOT_EXPORT_NON_EXTRACTABLE_KEY,
    TREZOA_ERROR__TIMESTAMP_OUT_OF_RANGE,
    TREZOA_ERROR__TRANSACTION__ADDRESS_MISSING,
    TREZOA_ERROR__TRANSACTION__ADDRESSES_CANNOT_SIGN_TRANSACTION,
    TREZOA_ERROR__TRANSACTION__EXCEEDS_SIZE_LIMIT,
    TREZOA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_ADDRESS_LOOKUP_TABLE_CONTENTS_MISSING,
    TREZOA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_ADDRESS_LOOKUP_TABLE_INDEX_OUT_OF_RANGE,
    TREZOA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_INSTRUCTION_PROGRAM_ADDRESS_NOT_FOUND,
    TREZOA_ERROR__TRANSACTION__FAILED_WHEN_SIMULATING_TO_ESTIMATE_COMPUTE_LIMIT,
    TREZOA_ERROR__TRANSACTION__INVOKED_PROGRAMS_CANNOT_PAY_FEES,
    TREZOA_ERROR__TRANSACTION__INVOKED_PROGRAMS_MUST_NOT_BE_WRITABLE,
    TREZOA_ERROR__TRANSACTION__MESSAGE_SIGNATURES_MISMATCH,
    TREZOA_ERROR__TRANSACTION__NONCE_ACCOUNT_CANNOT_BE_IN_LOOKUP_TABLE,
    TREZOA_ERROR__TRANSACTION__SIGNATURES_MISSING,
    TREZOA_ERROR__TRANSACTION__VERSION_NUMBER_NOT_SUPPORTED,
    TREZOA_ERROR__TRANSACTION__VERSION_NUMBER_OUT_OF_RANGE,
    TREZOA_ERROR__TRANSACTION_ERROR__DUPLICATE_INSTRUCTION,
    TREZOA_ERROR__TRANSACTION_ERROR__INSUFFICIENT_FUNDS_FOR_RENT,
    TREZOA_ERROR__TRANSACTION_ERROR__PROGRAM_EXECUTION_TEMPORARILY_RESTRICTED,
    TREZOA_ERROR__TRANSACTION_ERROR__UNKNOWN,
    TrezoaErrorCode,
} from './codes';
import { RpcSimulateTransactionResult } from './json-rpc-error';

type BasicInstructionErrorContext<T extends TrezoaErrorCode> = { [P in T]: { index: number } };

type DefaultUnspecifiedErrorContextToUndefined<T> = {
    [P in TrezoaErrorCode]: P extends keyof T ? T[P] : undefined;
};

type ReadonlyContextValue<T> = {
    [P in keyof T]: Readonly<T[P]>;
};

type TypedArrayMutableProperties = 'copyWithin' | 'fill' | 'reverse' | 'set' | 'sort';
interface ReadonlyUint8Array extends Omit<Uint8Array, TypedArrayMutableProperties> {
    readonly [n: number]: number;
}

/** A amount of bytes. */
type Bytes = number;

/**
 * A map of every {@link TrezoaError} code to the type of its `context` property.
 */
export type TrezoaErrorContext = ReadonlyContextValue<
    DefaultUnspecifiedErrorContextToUndefined<
        BasicInstructionErrorContext<
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__ACCOUNT_ALREADY_INITIALIZED
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__ACCOUNT_BORROW_FAILED
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__ACCOUNT_BORROW_OUTSTANDING
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__ACCOUNT_DATA_SIZE_CHANGED
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__ACCOUNT_DATA_TOO_SMALL
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__ACCOUNT_NOT_EXECUTABLE
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__ACCOUNT_NOT_RENT_EXEMPT
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__ARITHMETIC_OVERFLOW
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__BORSH_IO_ERROR
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__BUILTIN_PROGRAMS_MUST_CONSUME_COMPUTE_UNITS
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__CALL_DEPTH
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__COMPUTATIONAL_BUDGET_EXCEEDED
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__CUSTOM
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__DUPLICATE_ACCOUNT_INDEX
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__DUPLICATE_ACCOUNT_OUT_OF_SYNC
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_ACCOUNT_NOT_RENT_EXEMPT
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_DATA_MODIFIED
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_LAMPORT_CHANGE
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_MODIFIED
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__EXTERNAL_ACCOUNT_DATA_MODIFIED
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__EXTERNAL_ACCOUNT_LAMPORT_SPEND
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__GENERIC_ERROR
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__ILLEGAL_OWNER
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__IMMUTABLE
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__INCORRECT_AUTHORITY
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__INCORRECT_PROGRAM_ID
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__INSUFFICIENT_FUNDS
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__INVALID_ACCOUNT_DATA
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__INVALID_ACCOUNT_OWNER
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__INVALID_ARGUMENT
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__INVALID_ERROR
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__INVALID_INSTRUCTION_DATA
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__INVALID_REALLOC
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__INVALID_SEEDS
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__MAX_ACCOUNTS_DATA_ALLOCATIONS_EXCEEDED
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__MAX_ACCOUNTS_EXCEEDED
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__MAX_INSTRUCTION_TRACE_LENGTH_EXCEEDED
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__MAX_SEED_LENGTH_EXCEEDED
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__MISSING_ACCOUNT
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__MISSING_REQUIRED_SIGNATURE
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__MODIFIED_PROGRAM_ID
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__NOT_ENOUGH_ACCOUNT_KEYS
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__PRIVILEGE_ESCALATION
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__PROGRAM_ENVIRONMENT_SETUP_FAILURE
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__PROGRAM_FAILED_TO_COMPILE
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__PROGRAM_FAILED_TO_COMPLETE
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__READONLY_DATA_MODIFIED
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__READONLY_LAMPORT_CHANGE
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__REENTRANCY_NOT_ALLOWED
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__RENT_EPOCH_MODIFIED
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__UNBALANCED_INSTRUCTION
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__UNINITIALIZED_ACCOUNT
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__UNKNOWN
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__UNSUPPORTED_PROGRAM_ID
            | typeof TREZOA_ERROR__INSTRUCTION_ERROR__UNSUPPORTED_SYSVAR
        > & {
            [TREZOA_ERROR__ACCOUNTS__ACCOUNT_NOT_FOUND]: {
                address: string;
            };
            [TREZOA_ERROR__ACCOUNTS__EXPECTED_ALL_ACCOUNTS_TO_BE_DECODED]: {
                addresses: readonly string[];
            };
            [TREZOA_ERROR__ACCOUNTS__EXPECTED_DECODED_ACCOUNT]: {
                address: string;
            };
            [TREZOA_ERROR__ACCOUNTS__FAILED_TO_DECODE_ACCOUNT]: {
                address: string;
            };
            [TREZOA_ERROR__ACCOUNTS__ONE_OR_MORE_ACCOUNTS_NOT_FOUND]: {
                addresses: readonly string[];
            };
            [TREZOA_ERROR__ADDRESSES__INVALID_BASE58_ENCODED_ADDRESS]: {
                putativeAddress: string;
            };
            [TREZOA_ERROR__ADDRESSES__INVALID_BYTE_LENGTH]: {
                actualLength: number;
            };
            [TREZOA_ERROR__ADDRESSES__MAX_NUMBER_OF_PDA_SEEDS_EXCEEDED]: {
                actual: number;
                maxSeeds: number;
            };
            [TREZOA_ERROR__ADDRESSES__MAX_PDA_SEED_LENGTH_EXCEEDED]: {
                actual: number;
                index: number;
                maxSeedLength: number;
            };
            [TREZOA_ERROR__ADDRESSES__PDA_BUMP_SEED_OUT_OF_RANGE]: {
                bump: number;
            };
            [TREZOA_ERROR__ADDRESSES__STRING_LENGTH_OUT_OF_RANGE]: {
                actualLength: number;
            };
            [TREZOA_ERROR__BLOCKHASH_STRING_LENGTH_OUT_OF_RANGE]: {
                actualLength: number;
            };
            [TREZOA_ERROR__BLOCK_HEIGHT_EXCEEDED]: {
                currentBlockHeight: bigint;
                lastValidBlockHeight: bigint;
            };
            [TREZOA_ERROR__CODECS__CANNOT_DECODE_EMPTY_BYTE_ARRAY]: {
                codecDescription: string;
            };
            [TREZOA_ERROR__CODECS__CANNOT_USE_LEXICAL_VALUES_AS_ENUM_DISCRIMINATORS]: {
                stringValues: readonly string[];
            };
            [TREZOA_ERROR__CODECS__ENCODED_BYTES_MUST_NOT_INCLUDE_SENTINEL]: {
                encodedBytes: ReadonlyUint8Array;
                hexEncodedBytes: string;
                hexSentinel: string;
                sentinel: ReadonlyUint8Array;
            };
            [TREZOA_ERROR__CODECS__ENCODER_DECODER_FIXED_SIZE_MISMATCH]: {
                decoderFixedSize: number;
                encoderFixedSize: number;
            };
            [TREZOA_ERROR__CODECS__ENCODER_DECODER_MAX_SIZE_MISMATCH]: {
                decoderMaxSize: number | undefined;
                encoderMaxSize: number | undefined;
            };
            [TREZOA_ERROR__CODECS__ENUM_DISCRIMINATOR_OUT_OF_RANGE]: {
                discriminator: bigint | number;
                formattedValidDiscriminators: string;
                validDiscriminators: readonly number[];
            };
            [TREZOA_ERROR__CODECS__EXPECTED_DECODER_TO_CONSUME_ENTIRE_BYTE_ARRAY]: {
                expectedLength: number;
                numExcessBytes: number;
            };
            [TREZOA_ERROR__CODECS__EXPECTED_POSITIVE_BYTE_LENGTH]: {
                bytesLength: number;
                codecDescription: string;
            };
            [TREZOA_ERROR__CODECS__EXPECTED_ZERO_VALUE_TO_MATCH_ITEM_FIXED_SIZE]: {
                codecDescription: string;
                expectedSize: number;
                hexZeroValue: string;
                zeroValue: ReadonlyUint8Array;
            };
            [TREZOA_ERROR__CODECS__INVALID_BYTE_LENGTH]: {
                bytesLength: number;
                codecDescription: string;
                expected: number;
            };
            [TREZOA_ERROR__CODECS__INVALID_CONSTANT]: {
                constant: ReadonlyUint8Array;
                data: ReadonlyUint8Array;
                hexConstant: string;
                hexData: string;
                offset: number;
            };
            [TREZOA_ERROR__CODECS__INVALID_DISCRIMINATED_UNION_VARIANT]: {
                value: bigint | boolean | number | string | null | undefined;
                variants: readonly (bigint | boolean | number | string | null | undefined)[];
            };
            [TREZOA_ERROR__CODECS__INVALID_ENUM_VARIANT]: {
                formattedNumericalValues: string;
                numericalValues: readonly number[];
                stringValues: readonly string[];
                variant: number | string | symbol;
            };
            [TREZOA_ERROR__CODECS__INVALID_LITERAL_UNION_VARIANT]: {
                value: bigint | boolean | number | string | null | undefined;
                variants: readonly (bigint | boolean | number | string | null | undefined)[];
            };
            [TREZOA_ERROR__CODECS__INVALID_NUMBER_OF_ITEMS]: {
                actual: bigint | number;
                codecDescription: string;
                expected: bigint | number;
            };
            [TREZOA_ERROR__CODECS__INVALID_STRING_FOR_BASE]: {
                alphabet: string;
                base: number;
                value: string;
            };
            [TREZOA_ERROR__CODECS__LITERAL_UNION_DISCRIMINATOR_OUT_OF_RANGE]: {
                discriminator: bigint | number;
                maxRange: number;
                minRange: number;
            };
            [TREZOA_ERROR__CODECS__NUMBER_OUT_OF_RANGE]: {
                codecDescription: string;
                max: bigint | number;
                min: bigint | number;
                value: bigint | number;
            };
            [TREZOA_ERROR__CODECS__OFFSET_OUT_OF_RANGE]: {
                bytesLength: number;
                codecDescription: string;
                offset: number;
            };
            [TREZOA_ERROR__CODECS__SENTINEL_MISSING_IN_DECODED_BYTES]: {
                decodedBytes: ReadonlyUint8Array;
                hexDecodedBytes: string;
                hexSentinel: string;
                sentinel: ReadonlyUint8Array;
            };
            [TREZOA_ERROR__CODECS__UNION_VARIANT_OUT_OF_RANGE]: {
                maxRange: number;
                minRange: number;
                variant: number;
            };
            [TREZOA_ERROR__INSTRUCTION_ERROR__BORSH_IO_ERROR]: {
                index: number;
            };
            [TREZOA_ERROR__INSTRUCTION_ERROR__CUSTOM]: {
                code: number;
                index: number;
            };
            [TREZOA_ERROR__INSTRUCTION_ERROR__UNKNOWN]: {
                errorName: string;
                index: number;
                instructionErrorContext?: unknown;
            };
            [TREZOA_ERROR__INSTRUCTION_PLANS__FAILED_TO_EXECUTE_TRANSACTION_PLAN]: {
                transactionPlanResult: unknown;
            };
            [TREZOA_ERROR__INSTRUCTION_PLANS__MESSAGE_CANNOT_ACCOMMODATE_PLAN]: {
                numBytesRequired: number;
                numFreeBytes: number;
            };
            [TREZOA_ERROR__INSTRUCTION__EXPECTED_TO_HAVE_ACCOUNTS]: {
                data?: ReadonlyUint8Array;
                programAddress: string;
            };
            [TREZOA_ERROR__INSTRUCTION__EXPECTED_TO_HAVE_DATA]: {
                accountAddresses?: readonly string[];
                programAddress: string;
            };
            [TREZOA_ERROR__INSTRUCTION__PROGRAM_ID_MISMATCH]: {
                actualProgramAddress: string;
                expectedProgramAddress: string;
            };
            [TREZOA_ERROR__INVALID_BLOCKHASH_BYTE_LENGTH]: {
                actualLength: number;
            };
            [TREZOA_ERROR__INVALID_NONCE]: {
                actualNonceValue: string;
                expectedNonceValue: string;
            };
            [TREZOA_ERROR__INVARIANT_VIOLATION__CACHED_ABORTABLE_ITERABLE_CACHE_ENTRY_MISSING]: {
                cacheKey: string;
            };
            [TREZOA_ERROR__INVARIANT_VIOLATION__DATA_PUBLISHER_CHANNEL_UNIMPLEMENTED]: {
                channelName: string;
                supportedChannelNames: readonly string[];
            };
            [TREZOA_ERROR__INVARIANT_VIOLATION__INVALID_INSTRUCTION_PLAN_KIND]: {
                kind: string;
            };
            [TREZOA_ERROR__INVARIANT_VIOLATION__INVALID_TRANSACTION_PLAN_KIND]: {
                kind: string;
            };
            [TREZOA_ERROR__INVARIANT_VIOLATION__SWITCH_MUST_BE_EXHAUSTIVE]: {
                unexpectedValue: unknown;
            };
            [TREZOA_ERROR__JSON_RPC__INTERNAL_ERROR]: {
                __serverMessage: string;
            };
            [TREZOA_ERROR__JSON_RPC__INVALID_PARAMS]: {
                __serverMessage: string;
            };
            [TREZOA_ERROR__JSON_RPC__INVALID_REQUEST]: {
                __serverMessage: string;
            };
            [TREZOA_ERROR__JSON_RPC__METHOD_NOT_FOUND]: {
                __serverMessage: string;
            };
            [TREZOA_ERROR__JSON_RPC__PARSE_ERROR]: {
                __serverMessage: string;
            };
            [TREZOA_ERROR__JSON_RPC__SCAN_ERROR]: {
                __serverMessage: string;
            };
            [TREZOA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_CLEANED_UP]: {
                __serverMessage: string;
            };
            [TREZOA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_NOT_AVAILABLE]: {
                __serverMessage: string;
            };
            [TREZOA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_STATUS_NOT_AVAILABLE_YET]: {
                __serverMessage: string;
            };
            [TREZOA_ERROR__JSON_RPC__SERVER_ERROR_EPOCH_REWARDS_PERIOD_ACTIVE]: {
                currentBlockHeight: bigint;
                rewardsCompleteBlockHeight: bigint;
                slot: bigint;
            };
            [TREZOA_ERROR__JSON_RPC__SERVER_ERROR_KEY_EXCLUDED_FROM_SECONDARY_INDEX]: {
                __serverMessage: string;
            };
            [TREZOA_ERROR__JSON_RPC__SERVER_ERROR_LONG_TERM_STORAGE_SLOT_SKIPPED]: {
                __serverMessage: string;
            };
            [TREZOA_ERROR__JSON_RPC__SERVER_ERROR_MIN_CONTEXT_SLOT_NOT_REACHED]: {
                contextSlot: bigint;
            };
            [TREZOA_ERROR__JSON_RPC__SERVER_ERROR_NODE_UNHEALTHY]: {
                numSlotsBehind?: number;
            };
            [TREZOA_ERROR__JSON_RPC__SERVER_ERROR_SEND_TRANSACTION_PREFLIGHT_FAILURE]: Omit<
                RpcSimulateTransactionResult,
                'err'
            >;
            [TREZOA_ERROR__JSON_RPC__SERVER_ERROR_SLOT_NOT_EPOCH_BOUNDARY]: {
                slot: bigint;
            };
            [TREZOA_ERROR__JSON_RPC__SERVER_ERROR_SLOT_SKIPPED]: {
                __serverMessage: string;
            };
            [TREZOA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_PRECOMPILE_VERIFICATION_FAILURE]: {
                __serverMessage: string;
            };
            [TREZOA_ERROR__JSON_RPC__SERVER_ERROR_UNSUPPORTED_TRANSACTION_VERSION]: {
                __serverMessage: string;
            };
            [TREZOA_ERROR__KEYS__INVALID_KEY_PAIR_BYTE_LENGTH]: {
                byteLength: number;
            };
            [TREZOA_ERROR__KEYS__INVALID_PRIVATE_KEY_BYTE_LENGTH]: {
                actualLength: number;
            };
            [TREZOA_ERROR__KEYS__INVALID_SIGNATURE_BYTE_LENGTH]: {
                actualLength: number;
            };
            [TREZOA_ERROR__KEYS__SIGNATURE_STRING_LENGTH_OUT_OF_RANGE]: {
                actualLength: number;
            };
            [TREZOA_ERROR__MALFORMED_BIGINT_STRING]: {
                value: string;
            };
            [TREZOA_ERROR__MALFORMED_JSON_RPC_ERROR]: {
                error: unknown;
                message: string;
            };
            [TREZOA_ERROR__MALFORMED_NUMBER_STRING]: {
                value: string;
            };
            [TREZOA_ERROR__NONCE_ACCOUNT_NOT_FOUND]: {
                nonceAccountAddress: string;
            };
            [TREZOA_ERROR__OFFCHAIN_MESSAGE__ADDRESSES_CANNOT_SIGN_OFFCHAIN_MESSAGE]: {
                expectedAddresses: readonly string[];
                unexpectedAddresses: readonly string[];
            };
            [TREZOA_ERROR__OFFCHAIN_MESSAGE__APPLICATION_DOMAIN_STRING_LENGTH_OUT_OF_RANGE]: {
                actualLength: number;
            };
            [TREZOA_ERROR__OFFCHAIN_MESSAGE__ENVELOPE_SIGNERS_MISMATCH]: {
                missingRequiredSigners: readonly string[];
                unexpectedSigners: readonly string[];
            };
            [TREZOA_ERROR__OFFCHAIN_MESSAGE__INVALID_APPLICATION_DOMAIN_BYTE_LENGTH]: {
                actualLength: number;
            };
            [TREZOA_ERROR__OFFCHAIN_MESSAGE__MAXIMUM_LENGTH_EXCEEDED]: {
                actualBytes: number;
                maxBytes: number;
            };
            [TREZOA_ERROR__OFFCHAIN_MESSAGE__MESSAGE_FORMAT_MISMATCH]: {
                actualMessageFormat: number;
                expectedMessageFormat: number;
            };
            [TREZOA_ERROR__OFFCHAIN_MESSAGE__MESSAGE_LENGTH_MISMATCH]: {
                actualLength: number;
                specifiedLength: number;
            };
            [TREZOA_ERROR__OFFCHAIN_MESSAGE__NUM_SIGNATURES_MISMATCH]: {
                numRequiredSignatures: number;
                signatoryAddresses: readonly string[];
                signaturesLength: number;
            };
            [TREZOA_ERROR__OFFCHAIN_MESSAGE__SIGNATURES_MISSING]: {
                addresses: readonly string[];
            };
            [TREZOA_ERROR__OFFCHAIN_MESSAGE__SIGNATURE_VERIFICATION_FAILURE]: {
                signatoriesWithInvalidSignatures: readonly string[];
                signatoriesWithMissingSignatures: readonly string[];
            };
            [TREZOA_ERROR__OFFCHAIN_MESSAGE__UNEXPECTED_VERSION]: {
                actualVersion: number;
                expectedVersion: number;
            };
            [TREZOA_ERROR__OFFCHAIN_MESSAGE__VERSION_NUMBER_NOT_SUPPORTED]: {
                unsupportedVersion: number;
            };
            [TREZOA_ERROR__RPC_SUBSCRIPTIONS__CANNOT_CREATE_SUBSCRIPTION_PLAN]: {
                notificationName: string;
            };
            [TREZOA_ERROR__RPC_SUBSCRIPTIONS__CHANNEL_FAILED_TO_CONNECT]: {
                errorEvent: Event;
            };
            [TREZOA_ERROR__RPC__API_PLAN_MISSING_FOR_RPC_METHOD]: {
                method: string;
                params: readonly unknown[];
            };
            [TREZOA_ERROR__RPC__INTEGER_OVERFLOW]: {
                argumentLabel: string;
                keyPath: readonly (number | string | symbol)[];
                methodName: string;
                optionalPathLabel: string;
                path?: string;
                value: bigint;
            };
            [TREZOA_ERROR__RPC__TRANSPORT_HTTP_ERROR]: {
                headers: Headers;
                message: string;
                statusCode: number;
            };
            [TREZOA_ERROR__RPC__TRANSPORT_HTTP_HEADER_FORBIDDEN]: {
                headers: readonly string[];
            };
            [TREZOA_ERROR__SIGNER__ADDRESS_CANNOT_HAVE_MULTIPLE_SIGNERS]: {
                address: string;
            };
            [TREZOA_ERROR__SIGNER__EXPECTED_KEY_PAIR_SIGNER]: {
                address: string;
            };
            [TREZOA_ERROR__SIGNER__EXPECTED_MESSAGE_MODIFYING_SIGNER]: {
                address: string;
            };
            [TREZOA_ERROR__SIGNER__EXPECTED_MESSAGE_PARTIAL_SIGNER]: {
                address: string;
            };
            [TREZOA_ERROR__SIGNER__EXPECTED_MESSAGE_SIGNER]: {
                address: string;
            };
            [TREZOA_ERROR__SIGNER__EXPECTED_TRANSACTION_MODIFYING_SIGNER]: {
                address: string;
            };
            [TREZOA_ERROR__SIGNER__EXPECTED_TRANSACTION_PARTIAL_SIGNER]: {
                address: string;
            };
            [TREZOA_ERROR__SIGNER__EXPECTED_TRANSACTION_SENDING_SIGNER]: {
                address: string;
            };
            [TREZOA_ERROR__SIGNER__EXPECTED_TRANSACTION_SIGNER]: {
                address: string;
            };
            [TREZOA_ERROR__SUBTLE_CRYPTO__CANNOT_EXPORT_NON_EXTRACTABLE_KEY]: {
                key: CryptoKey;
            };
            [TREZOA_ERROR__TIMESTAMP_OUT_OF_RANGE]: {
                value: bigint;
            };
            [TREZOA_ERROR__TRANSACTION_ERROR__DUPLICATE_INSTRUCTION]: {
                index: number;
            };
            [TREZOA_ERROR__TRANSACTION_ERROR__INSUFFICIENT_FUNDS_FOR_RENT]: {
                accountIndex: number;
            };
            [TREZOA_ERROR__TRANSACTION_ERROR__PROGRAM_EXECUTION_TEMPORARILY_RESTRICTED]: {
                accountIndex: number;
            };
            [TREZOA_ERROR__TRANSACTION_ERROR__UNKNOWN]: {
                errorName: string;
                transactionErrorContext?: unknown;
            };
            [TREZOA_ERROR__TRANSACTION__ADDRESSES_CANNOT_SIGN_TRANSACTION]: {
                expectedAddresses: readonly string[];
                unexpectedAddresses: readonly string[];
            };
            [TREZOA_ERROR__TRANSACTION__ADDRESS_MISSING]: {
                index: number;
            };
            [TREZOA_ERROR__TRANSACTION__EXCEEDS_SIZE_LIMIT]: {
                transactionSize: Bytes;
                transactionSizeLimit: Bytes;
            };
            [TREZOA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_ADDRESS_LOOKUP_TABLE_CONTENTS_MISSING]: {
                lookupTableAddresses: readonly string[];
            };
            [TREZOA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_ADDRESS_LOOKUP_TABLE_INDEX_OUT_OF_RANGE]: {
                highestKnownIndex: number;
                highestRequestedIndex: number;
                lookupTableAddress: string;
            };
            [TREZOA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_INSTRUCTION_PROGRAM_ADDRESS_NOT_FOUND]: {
                index: number;
            };
            [TREZOA_ERROR__TRANSACTION__FAILED_WHEN_SIMULATING_TO_ESTIMATE_COMPUTE_LIMIT]: {
                unitsConsumed: number;
            };
            [TREZOA_ERROR__TRANSACTION__INVOKED_PROGRAMS_CANNOT_PAY_FEES]: {
                programAddress: string;
            };
            [TREZOA_ERROR__TRANSACTION__INVOKED_PROGRAMS_MUST_NOT_BE_WRITABLE]: {
                programAddress: string;
            };
            [TREZOA_ERROR__TRANSACTION__MESSAGE_SIGNATURES_MISMATCH]: {
                numRequiredSignatures: number;
                signaturesLength: number;
                signerAddresses: readonly string[];
            };
            [TREZOA_ERROR__TRANSACTION__NONCE_ACCOUNT_CANNOT_BE_IN_LOOKUP_TABLE]: {
                nonce: string;
            };
            [TREZOA_ERROR__TRANSACTION__SIGNATURES_MISSING]: {
                addresses: readonly string[];
            };
            [TREZOA_ERROR__TRANSACTION__VERSION_NUMBER_NOT_SUPPORTED]: {
                unsupportedVersion: number;
            };
            [TREZOA_ERROR__TRANSACTION__VERSION_NUMBER_OUT_OF_RANGE]: {
                actualVersion: number;
            };
        }
    >
>;

export function decodeEncodedContext(encodedContext: string): object {
    const decodedUrlString = __NODEJS__ ? Buffer.from(encodedContext, 'base64').toString('utf8') : atob(encodedContext);
    return Object.fromEntries(new URLSearchParams(decodedUrlString).entries());
}

function encodeValue(value: unknown): string {
    if (Array.isArray(value)) {
        const commaSeparatedValues = value.map(encodeValue).join('%2C%20' /* ", " */);
        return '%5B' /* "[" */ + commaSeparatedValues + /* "]" */ '%5D';
    } else if (typeof value === 'bigint') {
        return `${value}n`;
    } else {
        return encodeURIComponent(
            String(
                value != null && Object.getPrototypeOf(value) === null
                    ? // Plain objects with no prototype don't have a `toString` method.
                      // Convert them before stringifying them.
                      { ...(value as object) }
                    : value,
            ),
        );
    }
}

function encodeObjectContextEntry([key, value]: [string, unknown]): `${typeof key}=${string}` {
    return `${key}=${encodeValue(value)}`;
}

export function encodeContextObject(context: object): string {
    const searchParamsString = Object.entries(context).map(encodeObjectContextEntry).join('&');
    return __NODEJS__ ? Buffer.from(searchParamsString, 'utf8').toString('base64') : btoa(searchParamsString);
}
