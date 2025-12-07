import fastStableStringify from '@trezoa/fast-stable-stringify';
import { isJsonRpcPayload } from '@trezoa/rpc-spec';

export function getTrezoaRpcPayloadDeduplicationKey(payload: unknown): string | undefined {
    return isJsonRpcPayload(payload) ? fastStableStringify([payload.method, payload.params]) : undefined;
}
