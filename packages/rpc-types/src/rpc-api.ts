import type { Slot } from './typed-numbers';

export type TrezoaRpcResponse<TValue> = Readonly<{
    context: Readonly<{ slot: Slot }>;
    value: TValue;
}>;
