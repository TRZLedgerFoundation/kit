import {
    assertAccountsDecoded,
    assertAccountsExist,
    type FetchAccountsConfig,
    fetchJsonParsedAccounts,
} from '@trezoa/accounts';
import type { Address } from '@trezoa/addresses';
import type { GetMultipleAccountsApi, Rpc } from '@trezoa/rpc';
import { type AddressesByLookupTableAddress } from '@trezoa/transaction-messages';

type FetchedAddressLookup = {
    addresses: Address[];
};

/**
 * Given a list of addresses belonging to address lookup tables, returns a map of lookup table
 * addresses to an ordered array of the addresses they contain.
 *
 * @param rpc An object that supports the {@link GetMultipleAccountsApi} of the Trezoa RPC API
 * @param config
 */
export async function fetchAddressesForLookupTables(
    lookupTableAddresses: Address[],
    rpc: Rpc<GetMultipleAccountsApi>,
    config?: FetchAccountsConfig,
): Promise<AddressesByLookupTableAddress> {
    if (lookupTableAddresses.length === 0) {
        return {};
    }

    const fetchedLookupTables = await fetchJsonParsedAccounts<FetchedAddressLookup[]>(
        rpc,
        lookupTableAddresses,
        config,
    );

    assertAccountsDecoded(fetchedLookupTables);
    assertAccountsExist(fetchedLookupTables);

    return fetchedLookupTables.reduce<AddressesByLookupTableAddress>((acc, lookup) => {
        return {
            ...acc,
            [lookup.address]: lookup.data.addresses,
        };
    }, {});
}
