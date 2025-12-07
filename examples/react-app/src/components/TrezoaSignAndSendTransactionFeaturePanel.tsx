import { Blockquote, Box, Button, Dialog, Flex, Link, Select, Text, TextField } from '@radix-ui/themes';
import {
    address,
    appendTransactionMessageInstruction,
    assertIsTransactionMessageWithSingleSendingSigner,
    createTransactionMessage,
    getBase58Decoder,
    lamports,
    pipe,
    setTransactionMessageFeePayerSigner,
    setTransactionMessageLifetimeUsingBlockhash,
    signAndSendTransactionMessageWithSigners,
} from '@trezoa/kit';
import { useWalletAccountTransactionSendingSigner } from '@trezoa/react';
import { getTransferTrzInstruction } from '@trezoa-program/system';
import { getUiWalletAccountStorageKey, type UiWalletAccount, useWallets } from '@wallet-standard/react';
import type { SyntheticEvent } from 'react';
import { useContext, useId, useMemo, useRef, useState } from 'react';
import { useSWRConfig } from 'swr';

import { ChainContext } from '../context/ChainContext';
import { RpcContext } from '../context/RpcContext';
import { ErrorDialog } from './ErrorDialog';
import { WalletMenuItemContent } from './WalletMenuItemContent';

type Props = Readonly<{
    account: UiWalletAccount;
}>;

function trzStringToLamports(trzQuantityString: string) {
    if (Number.isNaN(parseFloat(trzQuantityString))) {
        throw new Error('Could not parse token quantity: ' + String(trzQuantityString));
    }
    const formatter = new Intl.NumberFormat('en-US', { useGrouping: false });
    const bigIntLamports = BigInt(
        // @ts-expect-error - scientific notation is supported by `Intl.NumberFormat` but the types are wrong
        formatter.format(`${solQuantityString}E9`).split('.')[0],
    );
    return lamports(bigIntLamports);
}

export function TrezoaSignAndSendTransactionFeaturePanel({ account }: Props) {
    const { mutate } = useSWRConfig();
    const { current: NO_ERROR } = useRef(Symbol());
    const { rpc } = useContext(RpcContext);
    const wallets = useWallets();
    const [isSendingTransaction, setIsSendingTransaction] = useState(false);
    const [error, setError] = useState(NO_ERROR);
    const [lastSignature, setLastSignature] = useState<Uint8Array | undefined>();
    const [trzQuantityString, setTrzQuantityString] = useState<string>('');
    const [recipientAccountStorageKey, setRecipientAccountStorageKey] = useState<string | undefined>();
    const recipientAccount = useMemo(() => {
        if (recipientAccountStorageKey) {
            for (const wallet of wallets) {
                for (const account of wallet.accounts) {
                    if (getUiWalletAccountStorageKey(account) === recipientAccountStorageKey) {
                        return account;
                    }
                }
            }
        }
    }, [recipientAccountStorageKey, wallets]);
    const { chain: currentChain, trezoaExplorerClusterName } = useContext(ChainContext);
    const transactionSendingSigner = useWalletAccountTransactionSendingSigner(account, currentChain);
    const lamportsInputId = useId();
    const recipientSelectId = useId();
    return (
        <Flex asChild gap="2" direction={{ initial: 'column', sm: 'row' }} style={{ width: '100%' }}>
            <form
                onSubmit={async e => {
                    e.preventDefault();
                    setError(NO_ERROR);
                    setIsSendingTransaction(true);
                    try {
                        const amount = trzStringToLamports(trzQuantityString);
                        if (!recipientAccount) {
                            throw new Error('The address of the recipient could not be found');
                        }
                        const { value: latestBlockhash } = await rpc
                            .getLatestBlockhash({ commitment: 'confirmed' })
                            .send();
                        const message = pipe(
                            createTransactionMessage({ version: 0 }),
                            m => setTransactionMessageFeePayerSigner(transactionSendingSigner, m),
                            m => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, m),
                            m =>
                                appendTransactionMessageInstruction(
                                    getTransferTrzInstruction({
                                        amount,
                                        destination: address(recipientAccount.address),
                                        source: transactionSendingSigner,
                                    }),
                                    m,
                                ),
                        );
                        assertIsTransactionMessageWithSingleSendingSigner(message);
                        const signature = await signAndSendTransactionMessageWithSigners(message);
                        void mutate({ address: transactionSendingSigner.address, chain: currentChain });
                        void mutate({ address: recipientAccount.address, chain: currentChain });
                        setLastSignature(signature);
                        setTrzQuantityString('');
                    } catch (e) {
                        setLastSignature(undefined);
                        setError(e);
                    } finally {
                        setIsSendingTransaction(false);
                    }
                }}
            >
                <Box flexGrow="1" overflow="hidden">
                    <Flex gap="3" align="center">
                        <Box flexGrow="1" minWidth="90px" maxWidth="130px">
                            <TextField.Root
                                disabled={isSendingTransaction}
                                id={lamportsInputId}
                                placeholder="Amount"
                                onChange={(e: SyntheticEvent<HTMLInputElement>) =>
                                    setTrzQuantityString(e.currentTarget.value)
                                }
                                style={{ width: 'auto' }}
                                type="number"
                                value={trzQuantityString}
                            >
                                <TextField.Slot side="right">{'\u25ce'}</TextField.Slot>
                            </TextField.Root>
                        </Box>
                        <Box flexShrink="0">
                            <Text as="label" color="gray" htmlFor={recipientSelectId} weight="medium">
                                To Account
                            </Text>
                        </Box>
                        <Select.Root
                            disabled={isSendingTransaction}
                            onValueChange={setRecipientAccountStorageKey}
                            value={recipientAccount ? getUiWalletAccountStorageKey(recipientAccount) : undefined}
                        >
                            <Select.Trigger
                                style={{ flexGrow: 1, flexShrink: 1, overflow: 'hidden' }}
                                placeholder="Select a Connected Account"
                            />
                            <Select.Content>
                                {wallets.flatMap(wallet =>
                                    wallet.accounts
                                        .filter(({ chains }) => chains.includes(currentChain))
                                        .map(account => {
                                            const key = getUiWalletAccountStorageKey(account);
                                            return (
                                                <Select.Item key={key} value={key}>
                                                    <WalletMenuItemContent wallet={wallet}>
                                                        {account.address}
                                                    </WalletMenuItemContent>
                                                </Select.Item>
                                            );
                                        }),
                                )}
                            </Select.Content>
                        </Select.Root>
                    </Flex>
                </Box>
                <Dialog.Root
                    open={!!lastSignature}
                    onOpenChange={open => {
                        if (!open) {
                            setLastSignature(undefined);
                        }
                    }}
                >
                    <Dialog.Trigger>
                        <Button
                            color={error ? undefined : 'red'}
                            disabled={trzQuantityString === '' || !recipientAccount}
                            loading={isSendingTransaction}
                            type="submit"
                        >
                            Transfer
                        </Button>
                    </Dialog.Trigger>
                    {lastSignature ? (
                        <Dialog.Content
                            onClick={e => {
                                e.stopPropagation();
                            }}
                        >
                            <Dialog.Title>You transferred tokens!</Dialog.Title>
                            <Flex direction="column" gap="2">
                                <Text>Signature:</Text>
                                <Blockquote>{getBase58Decoder().decode(lastSignature)}</Blockquote>
                                <Text>
                                    <Link
                                        href={`https://explorer.trezoa.com/tx/${getBase58Decoder().decode(
                                            lastSignature,
                                        )}?cluster=${trezoaExplorerClusterName}`}
                                        target="_blank"
                                    >
                                        View this transaction
                                    </Link>{' '}
                                    on Explorer
                                </Text>
                            </Flex>
                            <Flex gap="3" mt="4" justify="end">
                                <Dialog.Close>
                                    <Button>Cool!</Button>
                                </Dialog.Close>
                            </Flex>
                        </Dialog.Content>
                    ) : null}
                </Dialog.Root>
                {error !== NO_ERROR ? (
                    <ErrorDialog error={error} onClose={() => setError(NO_ERROR)} title="Transfer failed" />
                ) : null}
            </form>
        </Flex>
    );
}
