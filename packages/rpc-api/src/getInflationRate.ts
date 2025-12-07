import type { F64UnsafeSeeDocumentation } from '@trezoa/rpc-types';

type GetInflationRateApiResponse = Readonly<{
    /** Epoch for which these values are valid */
    epoch: bigint;
    /** Inflation allocated to the foundation */
    foundation: F64UnsafeSeeDocumentation;
    /** Total inflation */
    total: F64UnsafeSeeDocumentation;
    /** Inflation allocated to validators */
    validator: F64UnsafeSeeDocumentation;
}>;

export type GetInflationRateApi = {
    /**
     * Returns the specific inflation values for the current epoch.
     *
     * @see https://trezoa.com/docs/rpc/http/getinflationrate
     */
    getInflationRate(): GetInflationRateApiResponse;
};
