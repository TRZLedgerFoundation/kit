---
'@trezoa/kit': patch
'@trezoa/codecs-strings': patch
---

Some npm packages are needed for specific runtimes only (eg. React Native, Node). To prevent package managers from unconditionally installing these packages when they have `auto-install-peers` enabled, we are marking them as optional in `peerDependenciesMeta`. When running in React Native, be sure to explicitly install `fastestsmallesttextencoderdecoder`. When running in Node, be sure to explicitly install `ws`. When using `@trezoa/react`, we will presume that you have already installed `react`.
