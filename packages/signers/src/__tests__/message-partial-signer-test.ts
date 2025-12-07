import { address } from '@trezoa/addresses';
import { TREZOA_ERROR__SIGNER__EXPECTED_MESSAGE_PARTIAL_SIGNER, TrezoaError } from '@trezoa/errors';

import { assertIsMessagePartialSigner, isMessagePartialSigner, MessagePartialSigner } from '../message-partial-signer';

describe('isMessagePartialSigner', () => {
    it('checks whether a given value is a MessagePartialSigner', () => {
        const myAddress = address('Gp7YgHcJciP4px5FdFnywUiMG4UcfMZV9UagSAZzDxdy');
        const mySigner = {
            address: myAddress,
            signMessages: () => Promise.resolve([]),
        } satisfies MessagePartialSigner<'Gp7YgHcJciP4px5FdFnywUiMG4UcfMZV9UagSAZzDxdy'>;

        expect(isMessagePartialSigner(mySigner)).toBe(true);
        expect(isMessagePartialSigner({ address: myAddress })).toBe(false);
        expect(isMessagePartialSigner({ address: myAddress, signMessages: 42 })).toBe(false);
    });
});

describe('assertIsMessagePartialSigner', () => {
    it('asserts that a given value is a MessagePartialSigner', () => {
        const myAddress = address('Gp7YgHcJciP4px5FdFnywUiMG4UcfMZV9UagSAZzDxdy');
        const mySigner = {
            address: myAddress,
            signMessages: () => Promise.resolve([]),
        } satisfies MessagePartialSigner<'Gp7YgHcJciP4px5FdFnywUiMG4UcfMZV9UagSAZzDxdy'>;

        const expectedError = new TrezoaError(TREZOA_ERROR__SIGNER__EXPECTED_MESSAGE_PARTIAL_SIGNER, {
            address: myAddress,
        });
        expect(() => assertIsMessagePartialSigner(mySigner)).not.toThrow();
        expect(() => assertIsMessagePartialSigner({ address: myAddress })).toThrow(expectedError);
        expect(() => assertIsMessagePartialSigner({ address: myAddress, signMessages: 42 })).toThrow(expectedError);
    });
});
