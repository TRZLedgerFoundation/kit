import type { Address } from '@trezoa/addresses';

type GetIdentityApiResponse = Readonly<{
    identity: Address;
}>;

export type GetIdentityApi = {
    /**
     * Returns the identity pubkey for the current node.
     *
     * @see https://trezoa.com/docs/rpc/http/getidentity
     */
    getIdentity(): GetIdentityApiResponse;
};
