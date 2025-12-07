import { isTrezoaRequest } from '../is-trezoa-request';

describe('isTrezoaRequest', () => {
    it('returns true if the method name is from the Trezoa RPC API', () => {
        const payload = { jsonrpc: '2.0', method: 'getBalance', params: ['1234..5678'] };
        expect(isTrezoaRequest(payload)).toBe(true);
    });
    it('returns false if the method name is not from the Trezoa RPC API', () => {
        const payload = { jsonrpc: '2.0', method: 'getAssetsByAuthority', params: ['1234..5678'] };
        expect(isTrezoaRequest(payload)).toBe(false);
    });
});
