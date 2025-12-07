import {
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
    TREZOA_ERROR__JSON_RPC__SERVER_ERROR_LONG_TERM_STORAGE_UNREACHABLE,
    TREZOA_ERROR__JSON_RPC__SERVER_ERROR_MIN_CONTEXT_SLOT_NOT_REACHED,
    TREZOA_ERROR__JSON_RPC__SERVER_ERROR_NO_SNAPSHOT,
    TREZOA_ERROR__JSON_RPC__SERVER_ERROR_NODE_UNHEALTHY,
    TREZOA_ERROR__JSON_RPC__SERVER_ERROR_SEND_TRANSACTION_PREFLIGHT_FAILURE,
    TREZOA_ERROR__JSON_RPC__SERVER_ERROR_SLOT_NOT_EPOCH_BOUNDARY,
    TREZOA_ERROR__JSON_RPC__SERVER_ERROR_SLOT_SKIPPED,
    TREZOA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_HISTORY_NOT_AVAILABLE,
    TREZOA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_PRECOMPILE_VERIFICATION_FAILURE,
    TREZOA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_SIGNATURE_LEN_MISMATCH,
    TREZOA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_SIGNATURE_VERIFICATION_FAILURE,
    TREZOA_ERROR__JSON_RPC__SERVER_ERROR_UNSUPPORTED_TRANSACTION_VERSION,
    TREZOA_ERROR__MALFORMED_JSON_RPC_ERROR,
    TrezoaErrorCode,
} from '../codes';
import { TrezoaErrorContext } from '../context';
import { TrezoaError } from '../error';
import { getTrezoaErrorFromJsonRpcError } from '../json-rpc-error';
import { getTrezoaErrorFromTransactionError } from '../transaction-error';

jest.mock('../transaction-error.ts');

describe('getTrezoaErrorFromJsonRpcError', () => {
    it('produces a `TrezoaError` with the same code as the one given', () => {
        const code = 123 as TrezoaErrorCode;
        const error = getTrezoaErrorFromJsonRpcError({ code, message: 'o no' });
        expect(error).toHaveProperty('context.__code', 123);
    });
    it('converts bigint codes to numbers', () => {
        const code = 123n;
        const error = getTrezoaErrorFromJsonRpcError({ code, message: 'o no' });
        expect(error).toHaveProperty('context.__code', 123);
    });
    it('produces a `TREZOA_ERROR__UNRECOGNIZED_JSON_RPC_ERROR` when no code is given', () => {
        const error = getTrezoaErrorFromJsonRpcError({ foo: 'bar', message: 'o no' });
        expect(error).toHaveProperty('context.__code', TREZOA_ERROR__MALFORMED_JSON_RPC_ERROR);
        expect(error).toHaveProperty('context.error', { foo: 'bar', message: 'o no' });
        expect(error).toHaveProperty('context.message', 'o no');
    });
    it('produces a `TREZOA_ERROR__UNRECOGNIZED_JSON_RPC_ERROR` with a fallback message when none is provided', () => {
        const error = getTrezoaErrorFromJsonRpcError(null);
        expect(error).toHaveProperty('context.__code', TREZOA_ERROR__MALFORMED_JSON_RPC_ERROR);
        expect(error).toHaveProperty('context.error', null);
        expect(error).toHaveProperty('context.message', 'Malformed JSON-RPC error with no message attribute');
    });
    describe.each([
        TREZOA_ERROR__JSON_RPC__SERVER_ERROR_EPOCH_REWARDS_PERIOD_ACTIVE,
        TREZOA_ERROR__JSON_RPC__SERVER_ERROR_MIN_CONTEXT_SLOT_NOT_REACHED,
        TREZOA_ERROR__JSON_RPC__SERVER_ERROR_NODE_UNHEALTHY,
        TREZOA_ERROR__JSON_RPC__SERVER_ERROR_SLOT_NOT_EPOCH_BOUNDARY,
    ])('given a %s JSON-RPC error known to have data', jsonRpcErrorCode => {
        const expectedData = { baz: 'bat', foo: 'bar' } as unknown as TrezoaErrorContext[TrezoaErrorCode];
        it('does not set the server message on context', () => {
            const error = getTrezoaErrorFromJsonRpcError({
                code: jsonRpcErrorCode,
                data: expectedData,
                message: 'o no',
            });
            expect(error).not.toHaveProperty('context.__serverMessage');
        });
        it('produces a `TrezoaError` with that data as context', () => {
            const error = getTrezoaErrorFromJsonRpcError({
                code: jsonRpcErrorCode,
                data: expectedData,
                message: 'o no',
            });
            expect(error).toHaveProperty('context', expect.objectContaining(expectedData));
        });
    });
    describe.each([
        TREZOA_ERROR__JSON_RPC__INTERNAL_ERROR,
        TREZOA_ERROR__JSON_RPC__INVALID_PARAMS,
        TREZOA_ERROR__JSON_RPC__INVALID_REQUEST,
        TREZOA_ERROR__JSON_RPC__METHOD_NOT_FOUND,
        TREZOA_ERROR__JSON_RPC__PARSE_ERROR,
        TREZOA_ERROR__JSON_RPC__SCAN_ERROR,
        TREZOA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_CLEANED_UP,
        TREZOA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_NOT_AVAILABLE,
        TREZOA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_STATUS_NOT_AVAILABLE_YET,
        TREZOA_ERROR__JSON_RPC__SERVER_ERROR_KEY_EXCLUDED_FROM_SECONDARY_INDEX,
        TREZOA_ERROR__JSON_RPC__SERVER_ERROR_LONG_TERM_STORAGE_SLOT_SKIPPED,
        TREZOA_ERROR__JSON_RPC__SERVER_ERROR_SLOT_SKIPPED,
        TREZOA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_PRECOMPILE_VERIFICATION_FAILURE,
        TREZOA_ERROR__JSON_RPC__SERVER_ERROR_UNSUPPORTED_TRANSACTION_VERSION,
    ])(
        'given a %s JSON-RPC error known to have no data but important context in the server message',
        jsonRpcErrorCode => {
            it('produces a `TrezoaError` with the server message on the context', () => {
                const error = getTrezoaErrorFromJsonRpcError({ code: jsonRpcErrorCode, message: 'o no' });
                expect(error).toHaveProperty('context.__serverMessage', 'o no');
            });
        },
    );
    describe.each([
        TREZOA_ERROR__JSON_RPC__SERVER_ERROR_LONG_TERM_STORAGE_UNREACHABLE,
        TREZOA_ERROR__JSON_RPC__SERVER_ERROR_MIN_CONTEXT_SLOT_NOT_REACHED,
        TREZOA_ERROR__JSON_RPC__SERVER_ERROR_NO_SNAPSHOT,
        TREZOA_ERROR__JSON_RPC__SERVER_ERROR_NODE_UNHEALTHY,
        TREZOA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_HISTORY_NOT_AVAILABLE,
        TREZOA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_SIGNATURE_LEN_MISMATCH,
        TREZOA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_SIGNATURE_VERIFICATION_FAILURE,
    ])(
        'given a %s JSON-RPC error known to have neither data nor important context in the server message',
        jsonRpcErrorCode => {
            it('produces a `TrezoaError` without the server message on the context', () => {
                const error = getTrezoaErrorFromJsonRpcError({ code: jsonRpcErrorCode, message: 'o no' });
                expect(error).not.toHaveProperty('context.__serverMessage', 'o no');
            });
        },
    );
    describe.each([[1, 2, 3], Symbol('a symbol'), 1, 1n, true, false])('when given non-object data like `%s`', data => {
        it('does not add the data to `context`', () => {
            const error = getTrezoaErrorFromJsonRpcError({
                code: 123,
                data,
                message: 'o no',
            });
            expect(error).toHaveProperty(
                'context',
                // Implies exact match; `context` contains nothing but the `__code`
                { __code: 123 },
            );
        });
    });
    describe('when passed a preflight failure', () => {
        it('produces a `TrezoaError` with the transaction error as the `cause`', () => {
            const mockErrorResult = Symbol() as unknown as TrezoaError;
            jest.mocked(getTrezoaErrorFromTransactionError).mockReturnValue(mockErrorResult);
            const error = getTrezoaErrorFromJsonRpcError({
                code: TREZOA_ERROR__JSON_RPC__SERVER_ERROR_SEND_TRANSACTION_PREFLIGHT_FAILURE,
                data: { err: Symbol() },
                message: 'o no',
            });
            expect(error.cause).toBe(mockErrorResult);
        });
        it('produces a `TrezoaError` with the preflight failure data (minus the `err` property) as the context', () => {
            const preflightErrorData = { bar: 2, baz: 3, foo: 1 };
            const error = getTrezoaErrorFromJsonRpcError({
                code: TREZOA_ERROR__JSON_RPC__SERVER_ERROR_SEND_TRANSACTION_PREFLIGHT_FAILURE,
                data: { ...preflightErrorData, err: Symbol() },
                message: 'o no',
            });
            expect(error.context).toEqual({
                __code: TREZOA_ERROR__JSON_RPC__SERVER_ERROR_SEND_TRANSACTION_PREFLIGHT_FAILURE,
                ...preflightErrorData,
            });
        });
        it('delegates `err` to the transaction error getter', () => {
            const transactionError = Symbol();
            getTrezoaErrorFromJsonRpcError({
                code: TREZOA_ERROR__JSON_RPC__SERVER_ERROR_SEND_TRANSACTION_PREFLIGHT_FAILURE,
                data: { err: transactionError },
                message: 'o no',
            });
            expect(getTrezoaErrorFromTransactionError).toHaveBeenCalledWith(transactionError);
        });
    });
});
