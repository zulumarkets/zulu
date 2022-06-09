export const sportsAMMContract = {
    addresses: {
        10: 'TBD',
        42: '0x9656ce991ed988e83b8c67fbca91f1618bb09e54',
    },
    abi: [
        {
            anonymous: false,
            inputs: [
                { indexed: false, internalType: 'address', name: 'buyer', type: 'address' },
                { indexed: false, internalType: 'address', name: 'market', type: 'address' },
                { indexed: false, internalType: 'enum SportsAMM.Position', name: 'position', type: 'uint8' },
                { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
                { indexed: false, internalType: 'uint256', name: 'sUSDPaid', type: 'uint256' },
                { indexed: false, internalType: 'address', name: 'susd', type: 'address' },
                { indexed: false, internalType: 'address', name: 'asset', type: 'address' },
            ],
            name: 'BoughtFromAmm',
            type: 'event',
        },
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
            inputs: [{ indexed: false, internalType: 'address', name: 'account', type: 'address' }],
            name: 'Paused',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                { indexed: false, internalType: 'bytes32', name: 'asset', type: 'bytes32' },
                { indexed: false, internalType: 'uint256', name: '_cap', type: 'uint256' },
            ],
            name: 'SetCapPerAsset',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [{ indexed: false, internalType: 'uint256', name: '_capPerMarket', type: 'uint256' }],
            name: 'SetCapPerMarket',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                { indexed: false, internalType: 'bytes32', name: 'asset', type: 'bytes32' },
                { indexed: false, internalType: 'uint256', name: '_impliedVolatility', type: 'uint256' },
            ],
            name: 'SetImpliedVolatilityPerAsset',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [{ indexed: false, internalType: 'uint256', name: '_spread', type: 'uint256' }],
            name: 'SetMaxSpread',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [{ indexed: false, internalType: 'uint256', name: '_spread', type: 'uint256' }],
            name: 'SetMaxSupportedPrice',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [{ indexed: false, internalType: 'uint256', name: '_spread', type: 'uint256' }],
            name: 'SetMinSpread',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [{ indexed: false, internalType: 'uint256', name: '_spread', type: 'uint256' }],
            name: 'SetMinSupportedPrice',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [{ indexed: false, internalType: 'uint256', name: '_minimalTimeLeftToMaturity', type: 'uint256' }],
            name: 'SetMinimalTimeLeftToMaturity',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [{ indexed: false, internalType: 'address', name: '_manager', type: 'address' }],
            name: 'SetPositionalMarketManager',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [{ indexed: false, internalType: 'address', name: 'sUSD', type: 'address' }],
            name: 'SetSUSD',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [{ indexed: false, internalType: 'address', name: '_safeBox', type: 'address' }],
            name: 'SetSafeBox',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [{ indexed: false, internalType: 'uint256', name: '_safeBoxImpact', type: 'uint256' }],
            name: 'SetSafeBoxImpact',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [{ indexed: false, internalType: 'address', name: '_stakingThales', type: 'address' }],
            name: 'SetStakingThales',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [{ indexed: false, internalType: 'address', name: '_theRundownConsumer', type: 'address' }],
            name: 'SetTherundownConsumer',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                { indexed: false, internalType: 'address', name: 'seller', type: 'address' },
                { indexed: false, internalType: 'address', name: 'market', type: 'address' },
                { indexed: false, internalType: 'enum SportsAMM.Position', name: 'position', type: 'uint8' },
                { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
                { indexed: false, internalType: 'uint256', name: 'sUSDPaid', type: 'uint256' },
                { indexed: false, internalType: 'address', name: 'susd', type: 'address' },
                { indexed: false, internalType: 'address', name: 'asset', type: 'address' },
            ],
            name: 'SoldToAMM',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [{ indexed: false, internalType: 'address', name: 'account', type: 'address' }],
            name: 'Unpaused',
            type: 'event',
        },
        { inputs: [], name: 'acceptOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
        {
            inputs: [
                { internalType: 'address', name: 'market', type: 'address' },
                { internalType: 'enum SportsAMM.Position', name: 'position', type: 'uint8' },
            ],
            name: 'availableToBuyFromAMM',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                { internalType: 'address', name: 'market', type: 'address' },
                { internalType: 'enum SportsAMM.Position', name: 'position', type: 'uint8' },
            ],
            name: 'availableToSellToAMM',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                { internalType: 'address', name: 'market', type: 'address' },
                { internalType: 'enum SportsAMM.Position', name: 'position', type: 'uint8' },
                { internalType: 'uint256', name: 'amount', type: 'uint256' },
            ],
            name: 'balancePosition',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                { internalType: 'address', name: 'market', type: 'address' },
                { internalType: 'enum SportsAMM.Position', name: 'position', type: 'uint8' },
                { internalType: 'uint256', name: 'amount', type: 'uint256' },
                { internalType: 'uint256', name: 'expectedPayout', type: 'uint256' },
                { internalType: 'uint256', name: 'additionalSlippage', type: 'uint256' },
            ],
            name: 'buyFromAMM',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                { internalType: 'address', name: 'market', type: 'address' },
                { internalType: 'enum SportsAMM.Position', name: 'position', type: 'uint8' },
                { internalType: 'uint256', name: 'amount', type: 'uint256' },
            ],
            name: 'buyFromAmmQuote',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                { internalType: 'address', name: 'market', type: 'address' },
                { internalType: 'enum SportsAMM.Position', name: 'position', type: 'uint8' },
                { internalType: 'uint256', name: 'amount', type: 'uint256' },
            ],
            name: 'buyPriceImpact',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'address', name: 'market', type: 'address' }],
            name: 'canExerciseMaturedMarket',
            outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'capPerMarket',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'address', name: 'market', type: 'address' }],
            name: 'exerciseMaturedMarket',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'bytes32', name: 'asset', type: 'bytes32' }],
            name: 'getCapPerAsset',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'address', name: '_market', type: 'address' }],
            name: 'getMarketDefaultOdds',
            outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
            stateMutability: 'view',
            type: 'function',
        },
        { inputs: [], name: 'initNonReentrant', outputs: [], stateMutability: 'nonpayable', type: 'function' },
        {
            inputs: [
                { internalType: 'address', name: '_owner', type: 'address' },
                { internalType: 'contract IERC20Upgradeable', name: '_sUSD', type: 'address' },
                { internalType: 'uint256', name: '_capPerMarket', type: 'uint256' },
                { internalType: 'uint256', name: '_min_spread', type: 'uint256' },
                { internalType: 'uint256', name: '_max_spread', type: 'uint256' },
                { internalType: 'uint256', name: '_minimalTimeLeftToMaturity', type: 'uint256' },
            ],
            name: 'initialize',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'address', name: 'market', type: 'address' }],
            name: 'isMarketInAMMTrading',
            outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
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
            inputs: [],
            name: 'maxSupportedPrice',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'max_spread',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'minSupportedPrice',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'min_spread',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'minimalTimeLeftToMaturity',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
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
            inputs: [
                { internalType: 'address', name: '_market', type: 'address' },
                { internalType: 'enum SportsAMM.Position', name: '_position', type: 'uint8' },
            ],
            name: 'obtainOdds',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
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
            inputs: [
                { internalType: 'address', name: 'market', type: 'address' },
                { internalType: 'enum SportsAMM.Position', name: 'position', type: 'uint8' },
            ],
            name: 'price',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'address payable', name: 'account', type: 'address' }],
            name: 'retrieveSUSD',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                { internalType: 'address payable', name: 'account', type: 'address' },
                { internalType: 'uint256', name: 'amount', type: 'uint256' },
            ],
            name: 'retrieveSUSDAmount',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [],
            name: 'sUSD',
            outputs: [{ internalType: 'contract IERC20Upgradeable', name: '', type: 'address' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'safeBox',
            outputs: [{ internalType: 'address', name: '', type: 'address' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'safeBoxImpact',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                { internalType: 'address', name: 'market', type: 'address' },
                { internalType: 'enum SportsAMM.Position', name: 'position', type: 'uint8' },
                { internalType: 'uint256', name: 'amount', type: 'uint256' },
            ],
            name: 'sellPriceImpact',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                { internalType: 'address', name: 'market', type: 'address' },
                { internalType: 'enum SportsAMM.Position', name: 'position', type: 'uint8' },
                { internalType: 'uint256', name: 'amount', type: 'uint256' },
                { internalType: 'uint256', name: 'expectedPayout', type: 'uint256' },
                { internalType: 'uint256', name: 'additionalSlippage', type: 'uint256' },
            ],
            name: 'sellToAMM',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                { internalType: 'address', name: 'market', type: 'address' },
                { internalType: 'enum SportsAMM.Position', name: 'position', type: 'uint8' },
                { internalType: 'uint256', name: 'amount', type: 'uint256' },
            ],
            name: 'sellToAmmQuote',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                { internalType: 'bytes32', name: 'asset', type: 'bytes32' },
                { internalType: 'uint256', name: '_cap', type: 'uint256' },
            ],
            name: 'setCapPerAsset',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'uint256', name: '_capPerMarket', type: 'uint256' }],
            name: 'setCapPerMarket',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'uint256', name: '_spread', type: 'uint256' }],
            name: 'setMaxSpread',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'uint256', name: '_maxSupportedPrice', type: 'uint256' }],
            name: 'setMaxSupportedPrice',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'uint256', name: '_spread', type: 'uint256' }],
            name: 'setMinSpread',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'uint256', name: '_minSupportedPrice', type: 'uint256' }],
            name: 'setMinSupportedPrice',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'uint256', name: '_minimalTimeLeftToMaturity', type: 'uint256' }],
            name: 'setMinimalTimeLeftToMaturity',
            outputs: [],
            stateMutability: 'nonpayable',
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
            inputs: [{ internalType: 'address', name: '_manager', type: 'address' }],
            name: 'setPositionalMarketManager',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'contract IERC20Upgradeable', name: '_sUSD', type: 'address' }],
            name: 'setSUSD',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'address', name: '_safeBox', type: 'address' }],
            name: 'setSafeBox',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'uint256', name: '_safeBoxImpact', type: 'uint256' }],
            name: 'setSafeBoxImpact',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'contract IStakingThales', name: '_stakingThales', type: 'address' }],
            name: 'setStakingThales',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'address', name: '_testOdds', type: 'address' }],
            name: 'setTestOdds',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'address', name: '_theRundownConsumer', type: 'address' }],
            name: 'setTherundownConsumer',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                { internalType: 'address', name: '_address', type: 'address' },
                { internalType: 'bool', name: 'enabled', type: 'bool' },
            ],
            name: 'setWhitelistedAddress',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'address', name: '', type: 'address' }],
            name: 'spentOnMarket',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'stakingThales',
            outputs: [{ internalType: 'contract IStakingThales', name: '', type: 'address' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'testOdds',
            outputs: [{ internalType: 'address', name: '', type: 'address' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'theRundownConsumer',
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
        {
            inputs: [{ internalType: 'address', name: '', type: 'address' }],
            name: 'whitelistedAddresses',
            outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
            stateMutability: 'view',
            type: 'function',
        },
    ],
};

export default sportsAMMContract;