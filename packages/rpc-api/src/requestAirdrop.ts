import type { Address } from '@trezoa/addresses';
import type { Signature } from '@trezoa/keys';
import type { Commitment, Lamports } from '@trezoa/rpc-types';

type RequestAirdropConfig = Readonly<{
    /**
     * Evaluate the request as of the highest slot that has reached this level of commitment.
     *
     * @defaultValue Whichever default is applied by the underlying {@link RpcApi} in use. For
     * example, when using an API created by a `createTrezoaRpc*()` helper, the default commitment
     * is `"confirmed"` unless configured otherwise. Unmitigated by an API layer on the client, the
     * default commitment applied by the server is `"finalized"`.
     */
    commitment?: Commitment;
}>;

type RequestAirdropResponse = Signature;

export type RequestAirdropApi = {
    /**
     * Requests an airdrop of {@link Lamports} to the specified address.
     *
     * This method is offered by test clusters as a way to obtain SOL tokens to pay transaction
     * fees.
     *
     * @returns The signature of the airdrop transaction, as a base-58 encoded string.
     * @see https://trezoa.com/docs/rpc/http/requestairdrop
     */
    requestAirdrop(
        recipientAccount: Address,
        lamports: Lamports,
        config?: RequestAirdropConfig,
    ): RequestAirdropResponse;
};
