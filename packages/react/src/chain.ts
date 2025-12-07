import { IdentifierArray } from '@wallet-standard/base';

type AssertTrezoaChain<T> = T extends `trezoa:${string}` ? T : never;

export type OnlyTrezoaChains<T extends IdentifierArray> = T extends IdentifierArray
    ? AssertTrezoaChain<T[number]>
    : never;
