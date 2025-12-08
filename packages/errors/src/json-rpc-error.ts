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
    TREZOA_ERROR__JSON_RPC__SERVER_ERROR_KEY_EXCLUDED_FROM_SECONDARY_INDEX,
    TREZOA_ERROR__JSON_RPC__SERVER_ERROR_LONG_TERM_STORAGE_SLOT_SKIPPED,
    TREZOA_ERROR__JSON_RPC__SERVER_ERROR_SEND_TRANSACTION_PREFLIGHT_FAILURE,
    TREZOA_ERROR__JSON_RPC__SERVER_ERROR_SLOT_SKIPPED,
    TREZOA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_PRECOMPILE_VERIFICATION_FAILURE,
    TREZOA_ERROR__JSON_RPC__SERVER_ERROR_UNSUPPORTED_TRANSACTION_VERSION,
    TREZOA_ERROR__MALFORMED_JSON_RPC_ERROR,
    TrezoaErrorCode,
} from './codes';
import { TrezoaErrorContext } from './context';
import { TrezoaError } from './error';
import { safeCaptureStackTrace } from './stack-trace';
import { getTrezoaErrorFromTransactionError } from './transaction-error';

interface RpcErrorResponse {
    code: bigint | number;
    data?: unknown;
    message: string;
}

type TransactionError = string | { [key: string]: unknown };

/**
 * Keep in sync with https://github.com/trezoa-xyz/trezoa/blob/master/rpc-client-types/src/response.rs
 * @hidden
 */
export interface RpcSimulateTransactionResult {
    accounts:
        | ({
              data:
                  | string // LegacyBinary
                  | {
                        // Json
                        parsed: unknown;
                        program: string;
                        space: number;
                    }
                  // Binary
                  | [encodedBytes: string, encoding: 'base58' | 'base64' | 'base64+zstd' | 'binary' | 'jsonParsed'];
              executable: boolean;
              lamports: number;
              owner: string;
              rentEpoch: number;
              space?: number;
          } | null)[]
        | null;
    err: TransactionError | null;
    // Enabled by `enable_cpi_recording`
    innerInstructions?:
        | {
              index: number;
              instructions: (
                  | {
                        // Compiled
                        accounts: number[];
                        data: string;
                        programIdIndex: number;
                        stackHeight?: number;
                    }
                  | {
                        // Parsed
                        parsed: unknown;
                        program: string;
                        programId: string;
                        stackHeight?: number;
                    }
                  | {
                        // PartiallyDecoded
                        accounts: string[];
                        data: string;
                        programId: string;
                        stackHeight?: number;
                    }
              )[];
          }[]
        | null;
    loadedAccountsDataSize: number | null;
    logs: string[] | null;
    replacementBlockhash: string | null;
    returnData: {
        data: [string, 'base64'];
        programId: string;
    } | null;
    unitsConsumed: bigint | null;
}

export function getTrezoaErrorFromJsonRpcError(putativeErrorResponse: unknown): TrezoaError {
    let out: TrezoaError;
    if (isRpcErrorResponse(putativeErrorResponse)) {
        const { code: rawCode, data, message } = putativeErrorResponse;
        const code = Number(rawCode);
        if (code === TREZOA_ERROR__JSON_RPC__SERVER_ERROR_SEND_TRANSACTION_PREFLIGHT_FAILURE) {
            const { err, ...preflightErrorContext } = data as RpcSimulateTransactionResult;
            const causeObject = err ? { cause: getTrezoaErrorFromTransactionError(err) } : null;
            out = new TrezoaError(TREZOA_ERROR__JSON_RPC__SERVER_ERROR_SEND_TRANSACTION_PREFLIGHT_FAILURE, {
                ...preflightErrorContext,
                ...causeObject,
            });
        } else {
            let errorContext;
            switch (code) {
                case TREZOA_ERROR__JSON_RPC__INTERNAL_ERROR:
                case TREZOA_ERROR__JSON_RPC__INVALID_PARAMS:
                case TREZOA_ERROR__JSON_RPC__INVALID_REQUEST:
                case TREZOA_ERROR__JSON_RPC__METHOD_NOT_FOUND:
                case TREZOA_ERROR__JSON_RPC__PARSE_ERROR:
                case TREZOA_ERROR__JSON_RPC__SCAN_ERROR:
                case TREZOA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_CLEANED_UP:
                case TREZOA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_NOT_AVAILABLE:
                case TREZOA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_STATUS_NOT_AVAILABLE_YET:
                case TREZOA_ERROR__JSON_RPC__SERVER_ERROR_KEY_EXCLUDED_FROM_SECONDARY_INDEX:
                case TREZOA_ERROR__JSON_RPC__SERVER_ERROR_LONG_TERM_STORAGE_SLOT_SKIPPED:
                case TREZOA_ERROR__JSON_RPC__SERVER_ERROR_SLOT_SKIPPED:
                case TREZOA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_PRECOMPILE_VERIFICATION_FAILURE:
                case TREZOA_ERROR__JSON_RPC__SERVER_ERROR_UNSUPPORTED_TRANSACTION_VERSION:
                    // The server supplies no structured data, but rather a pre-formatted message. Put
                    // the server message in `context` so as not to completely lose the data. The long
                    // term fix for this is to add data to the server responses and modify the
                    // messages in `@trezoa/errors` to be actual format strings.
                    errorContext = { __serverMessage: message };
                    break;
                default:
                    if (typeof data === 'object' && !Array.isArray(data)) {
                        errorContext = data;
                    }
            }
            out = new TrezoaError(code as TrezoaErrorCode, errorContext as TrezoaErrorContext[TrezoaErrorCode]);
        }
    } else {
        const message =
            typeof putativeErrorResponse === 'object' &&
            putativeErrorResponse !== null &&
            'message' in putativeErrorResponse &&
            typeof putativeErrorResponse.message === 'string'
                ? putativeErrorResponse.message
                : 'Malformed JSON-RPC error with no message attribute';
        out = new TrezoaError(TREZOA_ERROR__MALFORMED_JSON_RPC_ERROR, { error: putativeErrorResponse, message });
    }
    safeCaptureStackTrace(out, getTrezoaErrorFromJsonRpcError);
    return out;
}

function isRpcErrorResponse(value: unknown): value is RpcErrorResponse {
    return (
        typeof value === 'object' &&
        value !== null &&
        'code' in value &&
        'message' in value &&
        (typeof value.code === 'number' || typeof value.code === 'bigint') &&
        typeof value.message === 'string'
    );
}
