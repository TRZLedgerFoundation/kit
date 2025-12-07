import { getBase16Encoder } from '@trezoa/codecs-strings';

export const b = (value: string) => getBase16Encoder().encode(value);
