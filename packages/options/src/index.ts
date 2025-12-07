/**
 * This package allows us to manage and serialize Rust-like Option types in JavaScript.
 * It can be used standalone, but it is also exported as part of Kit
 * [`@trezoa/kit`](https://github.com/trezoa-xyz/kit/tree/main/packages/kit).
 *
 * This package is also part of the [`@trezoa/codecs` package](https://github.com/trezoa-xyz/kit/tree/main/packages/codecs)
 * which acts as an entry point for all codec packages as well as for their documentation.
 *
 * @packageDocumentation
 */
export * from './option';
export * from './option-codec';
export * from './unwrap-option';
export * from './unwrap-option-recursively';
