import { TrezoaErrorCode, TrezoaErrorCodeWithCause } from './codes';
import { TrezoaErrorContext } from './context';
import { getErrorMessage } from './message-formatter';

/**
 * A type guard that returns `true` if the input is a {@link TrezoaError}, optionally with a
 * particular error code.
 *
 * When the `code` argument is supplied and the input is a {@link TrezoaError}, TypeScript will
 * refine the error's {@link TrezoaError#context | `context`} property to the type associated with
 * that error code. You can use that context to render useful error messages, or to make
 * context-aware decisions that help your application to recover from the error.
 *
 * @example
 * ```ts
 * import {
 *     TREZOA_ERROR__TRANSACTION__MISSING_SIGNATURE,
 *     TREZOA_ERROR__TRANSACTION__FEE_PAYER_SIGNATURE_MISSING,
 *     isTrezoaError,
 * } from '@trezoa/errors';
 * import { assertIsFullySignedTransaction, getSignatureFromTransaction } from '@trezoa/transactions';
 *
 * try {
 *     const transactionSignature = getSignatureFromTransaction(tx);
 *     assertIsFullySignedTransaction(tx);
 *     /* ... *\/
 * } catch (e) {
 *     if (isTrezoaError(e, TREZOA_ERROR__TRANSACTION__SIGNATURES_MISSING)) {
 *         displayError(
 *             "We can't send this transaction without signatures for these addresses:\n- %s",
 *             // The type of the `context` object is now refined to contain `addresses`.
 *             e.context.addresses.join('\n- '),
 *         );
 *         return;
 *     } else if (isTrezoaError(e, TREZOA_ERROR__TRANSACTION__FEE_PAYER_SIGNATURE_MISSING)) {
 *         if (!tx.feePayer) {
 *             displayError('Choose a fee payer for this transaction before sending it');
 *         } else {
 *             displayError('The fee payer still needs to sign for this transaction');
 *         }
 *         return;
 *     }
 *     throw e;
 * }
 * ```
 */
export function isTrezoaError<TErrorCode extends TrezoaErrorCode>(
    e: unknown,
    /**
     * When supplied, this function will require that the input is a {@link TrezoaError} _and_ that
     * its error code is exactly this value.
     */
    code?: TErrorCode,
): e is TrezoaError<TErrorCode> {
    const isTrezoaError = e instanceof Error && e.name === 'TrezoaError';
    if (isTrezoaError) {
        if (code !== undefined) {
            return (e as TrezoaError<TErrorCode>).context.__code === code;
        }
        return true;
    }
    return false;
}

type TrezoaErrorCodedContext = {
    [P in TrezoaErrorCode]: Readonly<{
        __code: P;
    }> &
        (TrezoaErrorContext[P] extends undefined ? object : TrezoaErrorContext[P]);
};

/**
 * Encapsulates an error's stacktrace, a Trezoa-specific numeric code that indicates what went
 * wrong, and optional context if the type of error indicated by the code supports it.
 */
export class TrezoaError<TErrorCode extends TrezoaErrorCode = TrezoaErrorCode> extends Error {
    /**
     * Indicates the root cause of this {@link TrezoaError}, if any.
     *
     * For example, a transaction error might have an instruction error as its root cause. In this
     * case, you will be able to access the instruction error on the transaction error as `cause`.
     */
    readonly cause?: TErrorCode extends TrezoaErrorCodeWithCause ? TrezoaError : unknown = this.cause;
    /**
     * Contains context that can assist in understanding or recovering from a {@link TrezoaError}.
     */
    readonly context: TrezoaErrorCodedContext[TErrorCode];
    constructor(
        ...[code, contextAndErrorOptions]: TrezoaErrorContext[TErrorCode] extends undefined
            ? [code: TErrorCode, errorOptions?: ErrorOptions | undefined]
            : [code: TErrorCode, contextAndErrorOptions: TrezoaErrorContext[TErrorCode] & (ErrorOptions | undefined)]
    ) {
        let context: TrezoaErrorContext[TErrorCode] | undefined;
        let errorOptions: ErrorOptions | undefined;
        if (contextAndErrorOptions) {
            Object.entries(Object.getOwnPropertyDescriptors(contextAndErrorOptions)).forEach(([name, descriptor]) => {
                // If the `ErrorOptions` type ever changes, update this code.
                if (name === 'cause') {
                    errorOptions = { cause: descriptor.value };
                } else {
                    if (context === undefined) {
                        context = {
                            __code: code,
                        } as unknown as TrezoaErrorContext[TErrorCode];
                    }
                    Object.defineProperty(context, name, descriptor);
                }
            });
        }
        const message = getErrorMessage(code, context);
        super(message, errorOptions);
        this.context = Object.freeze(
            context === undefined
                ? {
                      __code: code,
                  }
                : context,
        ) as TrezoaErrorCodedContext[TErrorCode];
        // This is necessary so that `isTrezoaError()` can identify a `TrezoaError` without having
        // to import the class for use in an `instanceof` check.
        this.name = 'TrezoaError';
    }
}
