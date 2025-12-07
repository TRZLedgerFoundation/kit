import type { Address } from '@trezoa/addresses';
import type { Signature } from '@trezoa/keys';
import type { RequestAirdropApi, Rpc } from '@trezoa/rpc';
import type { Commitment, Lamports } from '@trezoa/rpc-types';
import { waitForRecentTransactionConfirmationUntilTimeout } from '@trezoa/transaction-confirmation';

type RequestAndConfirmAirdropConfig = Readonly<{
    abortSignal?: AbortSignal;
    commitment: Commitment;
    confirmSignatureOnlyTransaction: (
        config: Omit<
            Parameters<typeof waitForRecentTransactionConfirmationUntilTimeout>[0],
            'getRecentSignatureConfirmationPromise' | 'getTimeoutPromise'
        >,
    ) => Promise<void>;
    lamports: Lamports;
    recipientAddress: Address;
    rpc: Rpc<RequestAirdropApi>;
}>;

export async function requestAndConfirmAirdrop_INTERNAL_ONLY_DO_NOT_EXPORT({
    abortSignal,
    commitment,
    confirmSignatureOnlyTransaction,
    lamports,
    recipientAddress,
    rpc,
}: RequestAndConfirmAirdropConfig): Promise<Signature> {
    const airdropTransactionSignature = await rpc
        .requestAirdrop(recipientAddress, lamports, { commitment })
        .send({ abortSignal });
    await confirmSignatureOnlyTransaction({
        abortSignal,
        commitment,
        signature: airdropTransactionSignature,
    });
    return airdropTransactionSignature;
}
