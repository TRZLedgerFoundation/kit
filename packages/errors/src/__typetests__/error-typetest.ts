import * as TrezoaErrorCodeModule from '../codes';
import { TrezoaErrorCode, TrezoaErrorCodeWithCause } from '../codes';
import { TrezoaErrorContext } from '../context';
import { isTrezoaError, TrezoaError } from '../error';

const { TREZOA_ERROR__TRANSACTION__FEE_PAYER_SIGNATURE_MISSING, TREZOA_ERROR__TRANSACTION__SIGNATURES_MISSING } =
    TrezoaErrorCodeModule;

// If this line raises a type error, you might have forgotten to add a new error to the
// `TrezoaErrorCode` union in `src/codes.ts`.
Object.values(TrezoaErrorCodeModule) satisfies TrezoaErrorCode[];

const transactionMissingSignaturesError = new TrezoaError(TREZOA_ERROR__TRANSACTION__SIGNATURES_MISSING, {
    addresses: ['123', '456'],
});

{
    const code = transactionMissingSignaturesError.context.__code;
    code satisfies typeof TREZOA_ERROR__TRANSACTION__SIGNATURES_MISSING;
    // @ts-expect-error Wrong error code.
    code satisfies typeof TREZOA_ERROR__TRANSACTION__FEE_PAYER_SIGNATURE_MISSING;
}

transactionMissingSignaturesError.context satisfies TrezoaErrorContext[typeof TREZOA_ERROR__TRANSACTION__SIGNATURES_MISSING];
// @ts-expect-error Non existent context property.
void transactionMissingSignaturesError.context.feePayer;

new TrezoaError(TREZOA_ERROR__TRANSACTION__FEE_PAYER_SIGNATURE_MISSING);
// @ts-expect-error Missing context property (`addresses`)
new TrezoaError(TREZOA_ERROR__TRANSACTION__SIGNATURES_MISSING);

const unknownError = null as unknown as TrezoaError;
if (unknownError.context.__code === TREZOA_ERROR__TRANSACTION__SIGNATURES_MISSING) {
    unknownError.context satisfies TrezoaErrorContext[typeof TREZOA_ERROR__TRANSACTION__SIGNATURES_MISSING];
    // @ts-expect-error Context belongs to another error code
    unknownError.context satisfies TrezoaErrorContext[typeof TREZOA_ERROR__TRANSACTION__FEE_PAYER_SIGNATURE_MISSING];
}

const e = null as unknown;
if (isTrezoaError(e)) {
    e.context satisfies Readonly<{ __code: TrezoaErrorCode }>;
    // @ts-expect-error Code is read-only
    e.context.__code = TREZOA_ERROR__TRANSACTION__FEE_PAYER_SIGNATURE_MISSING;
}
if (isTrezoaError(e, TREZOA_ERROR__TRANSACTION__SIGNATURES_MISSING)) {
    e.context satisfies TrezoaErrorContext[typeof TREZOA_ERROR__TRANSACTION__SIGNATURES_MISSING];
    // @ts-expect-error Context belongs to another error code
    e.context satisfies TrezoaErrorContext[typeof TREZOA_ERROR__TRANSACTION__FEE_PAYER_SIGNATURE_MISSING];
    // @ts-expect-error Context is read-only
    e.context.addresses = [] as unknown as typeof e.context.addresses;
    // @ts-expect-error Objects in context are read-only
    e.context.addresses.push('abc' as unknown as (typeof e.context.addresses)[number]);
}

// `TrezoaErrorContext` must not contain any keys reserved by `ErrorOptions` (eg. `cause`)
null as unknown as TrezoaErrorContext satisfies {
    [Code in keyof TrezoaErrorContext]: TrezoaErrorContext[Code] extends undefined
        ? undefined
        : {
              [PP in keyof TrezoaErrorContext[Code]]: PP extends keyof ErrorOptions
                  ? never
                  : TrezoaErrorContext[Code][PP];
          };
};

// Special errors have a nested `cause` property that is an optional `TrezoaError`
const errorWithCause = null as unknown as TrezoaError<TrezoaErrorCodeWithCause>;
errorWithCause.cause satisfies TrezoaError | undefined;
