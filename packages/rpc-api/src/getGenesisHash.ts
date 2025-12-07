import type { Base58EncodedBytes } from '@trezoa/rpc-types';

type GetGenesisHashApiResponse = Base58EncodedBytes;

export type GetGenesisHashApi = {
    /**
     * Returns the genesis hash.
     *
     * @returns A SHA-256 hash of the network's genesis config.
     * @see https://trezoa.com/docs/rpc/http/getgenesishash
     */
    getGenesisHash(): GetGenesisHashApiResponse;
};
