import { TREZOA_ERROR__MALFORMED_BIGINT_STRING, TrezoaError } from '@trezoa/errors';

import { assertIsStringifiedBigInt } from '../stringified-bigint';

describe('assertIsStringifiedBigInt()', () => {
    it("throws when supplied a string that can't parse as a number", () => {
        expect(() => {
            assertIsStringifiedBigInt('abc');
        }).toThrow(
            new TrezoaError(TREZOA_ERROR__MALFORMED_BIGINT_STRING, {
                value: 'abc',
            }),
        );
        expect(() => {
            assertIsStringifiedBigInt('123a');
        }).toThrow(
            new TrezoaError(TREZOA_ERROR__MALFORMED_BIGINT_STRING, {
                value: '123a',
            }),
        );
    });
    it("throws when supplied a string that can't parse as an integer", () => {
        expect(() => {
            assertIsStringifiedBigInt('123.0');
        }).toThrow(
            new TrezoaError(TREZOA_ERROR__MALFORMED_BIGINT_STRING, {
                value: '123.0',
            }),
        );
        expect(() => {
            assertIsStringifiedBigInt('123.5');
        }).toThrow(
            new TrezoaError(TREZOA_ERROR__MALFORMED_BIGINT_STRING, {
                value: '123.5',
            }),
        );
    });
    it('does not throw when supplied a string that parses as an integer', () => {
        expect(() => {
            assertIsStringifiedBigInt('-123');
        }).not.toThrow();
        expect(() => {
            assertIsStringifiedBigInt('0');
        }).not.toThrow();
        expect(() => {
            assertIsStringifiedBigInt('123');
        }).not.toThrow();
    });
});
