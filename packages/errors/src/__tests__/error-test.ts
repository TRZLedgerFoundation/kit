import '@trezoa/test-matchers/toBeFrozenObject';

import { isTrezoaError, TrezoaError } from '../error';
import { getErrorMessage } from '../message-formatter';

jest.mock('../message-formatter');

describe('TrezoaError', () => {
    describe('given an error with context', () => {
        let errorWithContext: TrezoaError;
        beforeEach(() => {
            errorWithContext = new TrezoaError(
                // @ts-expect-error Mock error codes don't conform to `TrezoaErrorCode`
                123,
                { foo: 'bar' },
            );
        });
        it('exposes its error code', () => {
            expect(errorWithContext.context).toHaveProperty('__code', 123);
        });
        it('exposes its context', () => {
            expect(errorWithContext.context).toHaveProperty('foo', 'bar');
        });
        it('exposes no cause', () => {
            expect(errorWithContext.cause).toBeUndefined();
        });
        it('calls the message formatter with the code and context', () => {
            expect(getErrorMessage).toHaveBeenCalledWith(123, expect.objectContaining({ foo: 'bar' }));
        });
        it('freezes the context object', () => {
            expect(errorWithContext.context).toBeFrozenObject();
        });
    });
    describe('given an error with no context', () => {
        beforeEach(() => {
            new TrezoaError(
                // @ts-expect-error Mock error codes don't conform to `TrezoaErrorCode`
                123,
                undefined,
            );
        });
        it('calls the message formatter with undefined context', () => {
            expect(getErrorMessage).toHaveBeenCalledWith(123, undefined);
        });
    });
    describe('given an error with a cause', () => {
        let errorWithCause: TrezoaError;
        let cause: unknown;
        beforeEach(() => {
            cause = {};
            errorWithCause = new TrezoaError(
                // @ts-expect-error Mock error codes don't conform to `TrezoaErrorCode`
                123,
                { cause },
            );
        });
        it('exposes its cause', () => {
            expect(errorWithCause.cause).toBe(cause);
        });
    });
    describe.each(['cause'])('given an error with only the `%s` property from `ErrorOptions` present', propName => {
        let errorOptionValue: unknown;
        let errorWithOption: TrezoaError;
        beforeEach(() => {
            errorOptionValue = Symbol();
            errorWithOption = new TrezoaError(
                // @ts-expect-error Mock error codes don't conform to `TrezoaErrorCode`
                123,
                { [propName]: errorOptionValue },
            );
        });
        it('omits the error option from its context', () => {
            expect(errorWithOption.context).not.toHaveProperty(propName);
        });
        it('calls the message formatter with the error option omitted', () => {
            expect(getErrorMessage).toHaveBeenCalledWith(
                123,
                expect.not.objectContaining({ [propName]: errorOptionValue }),
            );
        });
    });
    it('sets its message to the output of the message formatter', async () => {
        expect.assertions(1);
        jest.mocked(getErrorMessage).mockReturnValue('o no');
        await jest.isolateModulesAsync(async () => {
            const TrezoaErrorModule =
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                await import('../error');
            // @ts-expect-error Mock error codes don't conform to `TrezoaErrorCode`
            const error456 = new TrezoaErrorModule.TrezoaError(456);
            expect(error456).toHaveProperty('message', 'o no');
        });
    });
});

describe('isTrezoaError()', () => {
    let error123: TrezoaError;
    beforeEach(() => {
        // @ts-expect-error Mock error codes don't conform to `TrezoaErrorCode`
        error123 = new TrezoaError(123);
    });
    it('returns `true` for an instance of `TrezoaError`', () => {
        expect(isTrezoaError(error123)).toBe(true);
    });
    it('returns `false` for an instance of `Error`', () => {
        expect(isTrezoaError(new Error('bad thing'))).toBe(false);
    });
    it('returns `true` when the error code matches', () => {
        expect(
            isTrezoaError(
                error123,
                // @ts-expect-error Mock error codes don't conform to `TrezoaErrorCode`
                123,
            ),
        ).toBe(true);
    });
    it('returns `false` when the error code does not match', () => {
        expect(
            isTrezoaError(
                error123,
                // @ts-expect-error Mock error codes don't conform to `TrezoaErrorCode`
                456,
            ),
        ).toBe(false);
    });
});
