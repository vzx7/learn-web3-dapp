import {
    POLYGON_NETWORKS,
    POLYGON_PROTOCOLS,
} from "types"
  
export const getDataHubPolygonNodeUrl = (network: POLYGON_NETWORKS, protocol: POLYGON_PROTOCOLS): string => {
    if (network === POLYGON_NETWORKS.MAINNET) {
        if (protocol === POLYGON_PROTOCOLS.RPC) {
        return `https://${process.env.DATAHUB_POLYGON_MAINNET_RPC_URL}/apikey/${process.env.DATAHUB_POLYGON_API_KEY}`
        } else if (protocol === POLYGON_PROTOCOLS.JSON_RPC) {
        return `https://${process.env.DATAHUB_POLYGON_MAINNET_JSONRPC_URL}/apikey/${process.env.DATAHUB_POLYGON_API_KEY}`
        } else if (protocol === POLYGON_PROTOCOLS.WS) {
        return `wss://${process.env.DATAHUB_POLYGON_MAINNET_WS_URL}/apikey/${process.env.DATAHUB_POLYGON_API_KEY}`
        }
    } else if (network === POLYGON_NETWORKS.TESTNET) {
        if (protocol === POLYGON_PROTOCOLS.RPC) {
        return `https://${process.env.DATAHUB_POLYGON_TESTNET_RPC_URL}/apikey/${process.env.DATAHUB_POLYGON_API_KEY}`
        } else if (protocol === POLYGON_PROTOCOLS.JSON_RPC) {
        return `https://${process.env.DATAHUB_POLYGON_TESTNET_JSONRPC_URL}/apikey/${process.env.DATAHUB_POLYGON_API_KEY}`
        } else if (protocol === POLYGON_PROTOCOLS.WS) {
        return `wss://${process.env.DATAHUB_POLYGON_TESTNET_WS_URL}/apikey/${process.env.DATAHUB_POLYGON_API_KEY}`
        }
    }

return ""
}

export const getPolygonAddressExplorerURL = (address: string) => {
    return `https://mumbai.polygonscan.com/address/${address}`
  }

export const getPolygonBlockExplorerURL = (block: number) => {
    return `https://mumbai.polygonscan.com/block/${block}`
}

export const getPolygonTxExplorerURL = (txId: string) => {
    return `https://mumbai.polygonscan.com/tx/${txId}`
}

export const getPolygonTokenExplorerURL = (address: string) => {
    return `https://mumbai.polygonscan.com/token/${address}`
}
