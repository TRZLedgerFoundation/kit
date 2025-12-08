import type { Address } from '@trezoa/addresses';
import type { Commitment, TrezoaRpcResponse, TokenAmount } from '@trezoa/rpc-types';

type GetTokenAccountBalanceApiResponse = TokenAmount;

export type GetTokenAccountBalanceApi = {
    /**
     * Returns the balance of an TPL Token account.
     *
     * @see https://trezoa.com/docs/rpc/http/gettokenaccountbalance
     */
    getTokenAccountBalance(
        address: Address,
        config?: Readonly<{
            /**
             * Fetch the balance as of the highest slot that has reached this level of commitment.
             *
             * @defaultValue Whichever default is applied by the underlying {@link RpcApi} in use.
             * For example, when using an API created by a `createTrezoaRpc*()` helper, the default
             * commitment is `"confirmed"` unless configured otherwise. Unmitigated by an API layer
             * on the client, the default commitment applied by the server is `"finalized"`.
             */
            commitment?: Commitment;
        }>,
    ): TrezoaRpcResponse<GetTokenAccountBalanceApiResponse>;
};
