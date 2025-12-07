import { Transaction } from '@trezoa/transactions';
import { VersionedTransaction } from '@trezoa/web3.js';

import { fromVersionedTransaction } from '../transaction';

const transaction = null as unknown as VersionedTransaction;
fromVersionedTransaction(transaction) satisfies Transaction;
