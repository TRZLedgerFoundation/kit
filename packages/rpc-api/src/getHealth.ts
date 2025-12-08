type GetHealthApiResponse = 'ok';

export type GetHealthApi = {
    /**
     * Returns the health status of the node.
     *
     * A healthy node is one that is within _n_ slots of the latest cluster-confirmed slot, where
     * _n_ is a node-configurable parameter with a
     * [default of 128](https://github.com/trezoa-xyz/trezoa/blob/a080c4bb157f48b268b74cf5dd2f3de39db7dc5d/rpc-client-types/src/request.rs#L157).
     *
     * @returns The string "ok" if the node is healthy.
     * @throws {TREZOA_ERROR__JSON_RPC__SERVER_ERROR_NODE_UNHEALTHY} if the node is unhealthy. The
     * specifics of the error response are unstable and may change in the future.
     * @see https://trezoa.com/docs/rpc/http/gethealth
     */
    getHealth(): GetHealthApiResponse;
};
