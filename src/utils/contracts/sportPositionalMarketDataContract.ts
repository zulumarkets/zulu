export const sportPositionalMarketDataContract = {
    addresses: {
        5: '0xC7D8c34048D8bf6eB24FC76c7A61F47754990c81',
        10: '0xd8Bc9D6840C701bFAd5E7cf98CAdC2ee637c0701',
        42: '0x05C370827A21E491953BD0b8B1ce3290584aC486',
        420: '0x202209397e2A26dc3243bD4bF46480C1f6661032',
        42161: '0x503e7F2C19384Ff68B445E21850fDC61f34434e6',
    },
    abi: [
        {
            anonymous: false,
            inputs: [
                { indexed: false, internalType: 'address', name: 'oldOwner', type: 'address' },
                { indexed: false, internalType: 'address', name: 'newOwner', type: 'address' },
            ],
            name: 'OwnerChanged',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [{ indexed: false, internalType: 'address', name: 'newOwner', type: 'address' }],
            name: 'OwnerNominated',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [{ indexed: false, internalType: 'bool', name: 'isPaused', type: 'bool' }],
            name: 'PauseChanged',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [{ indexed: false, internalType: 'address', name: '_sportsAMM', type: 'address' }],
            name: 'SetSportsAMM',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [{ indexed: false, internalType: 'address', name: '_manager', type: 'address' }],
            name: 'SportPositionalMarketManagerChanged',
            type: 'event',
        },
        { inputs: [], name: 'acceptOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
        {
            inputs: [],
            name: 'getBaseOddsForAllActiveMarkets',
            outputs: [
                {
                    components: [
                        { internalType: 'address', name: 'market', type: 'address' },
                        { internalType: 'uint256[]', name: 'odds', type: 'uint256[]' },
                    ],
                    internalType: 'struct SportPositionalMarketData.ActiveMarketsOdds[]',
                    name: '',
                    type: 'tuple[]',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'getOddsForAllActiveMarkets',
            outputs: [
                {
                    components: [
                        { internalType: 'address', name: 'market', type: 'address' },
                        { internalType: 'uint256[]', name: 'odds', type: 'uint256[]' },
                    ],
                    internalType: 'struct SportPositionalMarketData.ActiveMarketsOdds[]',
                    name: '',
                    type: 'tuple[]',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                { internalType: 'uint256', name: 'batchNumber', type: 'uint256' },
                { internalType: 'uint256', name: 'batchSize', type: 'uint256' },
            ],
            name: 'getOddsForAllActiveMarketsInBatches',
            outputs: [
                {
                    components: [
                        { internalType: 'address', name: 'market', type: 'address' },
                        { internalType: 'uint256[]', name: 'odds', type: 'uint256[]' },
                    ],
                    internalType: 'struct SportPositionalMarketData.ActiveMarketsOdds[]',
                    name: '',
                    type: 'tuple[]',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'getPriceImpactForAllActiveMarkets',
            outputs: [
                {
                    components: [
                        { internalType: 'address', name: 'market', type: 'address' },
                        { internalType: 'int256[]', name: 'priceImpact', type: 'int256[]' },
                    ],
                    internalType: 'struct SportPositionalMarketData.ActiveMarketsPriceImpact[]',
                    name: '',
                    type: 'tuple[]',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                { internalType: 'uint256', name: 'batchNumber', type: 'uint256' },
                { internalType: 'uint256', name: 'batchSize', type: 'uint256' },
            ],
            name: 'getPriceImpactForAllActiveMarketsInBatches',
            outputs: [
                {
                    components: [
                        { internalType: 'address', name: 'market', type: 'address' },
                        { internalType: 'int256[]', name: 'priceImpact', type: 'int256[]' },
                    ],
                    internalType: 'struct SportPositionalMarketData.ActiveMarketsPriceImpact[]',
                    name: '',
                    type: 'tuple[]',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'address', name: '_owner', type: 'address' }],
            name: 'initialize',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [],
            name: 'lastPauseTime',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'manager',
            outputs: [{ internalType: 'address', name: '', type: 'address' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'address', name: '_owner', type: 'address' }],
            name: 'nominateNewOwner',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [],
            name: 'nominatedOwner',
            outputs: [{ internalType: 'address', name: '', type: 'address' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'owner',
            outputs: [{ internalType: 'address', name: '', type: 'address' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'paused',
            outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'address', name: '_owner', type: 'address' }],
            name: 'setOwner',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'bool', name: '_paused', type: 'bool' }],
            name: 'setPaused',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'address', name: '_manager', type: 'address' }],
            name: 'setSportPositionalMarketManager',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'address', name: '_sportsAMM', type: 'address' }],
            name: 'setSportsAMM',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [],
            name: 'sportsAMM',
            outputs: [{ internalType: 'address', name: '', type: 'address' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'address', name: 'proxyAddress', type: 'address' }],
            name: 'transferOwnershipAtInit',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ],
};

export default sportPositionalMarketDataContract;
