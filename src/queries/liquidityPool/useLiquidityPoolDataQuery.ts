import { useQuery, UseQueryOptions } from 'react-query';
import QUERY_KEYS from '../../constants/queryKeys';
import { bigNumberFormmaterWithDecimals, bigNumberFormatter } from 'utils/formatters/ethers';
import networkConnector from 'utils/networkConnector';
import { NetworkId } from 'types/network';
import { LiquidityPoolData } from 'types/liquidityPool';
import { getDefaultDecimalsForNetwork } from 'utils/collaterals';

const useLiquidityPoolDataQuery = (networkId: NetworkId, options?: UseQueryOptions<LiquidityPoolData | undefined>) => {
    return useQuery<LiquidityPoolData | undefined>(
        QUERY_KEYS.LiquidityPool.Data(networkId),
        async () => {
            const liquidityPoolData: LiquidityPoolData = {
                liquidityPoolStarted: false,
                maxAllowedDeposit: 0,
                round: 0,
                roundEndTime: 0,
                allocationNextRound: 0,
                allocationNextRoundPercentage: 0,
                allocationCurrentRound: 0,
                isRoundEnded: false,
                availableAllocationNextRound: 0,
                minDepositAmount: 0,
                maxAllowedUsers: 0,
                usersCurrentlyInLiquidityPool: 0,
                canCloseCurrentRound: false,
                paused: false,
                lifetimePnl: 0,
                roundLength: 0,
                stakedThalesMultiplier: 0,
            };

            const decimals = getDefaultDecimalsForNetwork(networkId);
            try {
                const { liquidityPoolContract } = networkConnector;
                if (liquidityPoolContract) {
                    const [
                        liquidityPoolStarted,
                        maxAllowedDeposit,
                        round,
                        allocationNextRound,
                        minDepositAmount,
                        maxAllowedUsers,
                        usersCurrentlyInLiquidityPool,
                        canCloseCurrentRound,
                        paused,
                        roundLength,
                        stakedThalesMultiplier,
                    ] = await Promise.all([
                        liquidityPoolContract?.started(),
                        liquidityPoolContract?.maxAllowedDeposit(),
                        liquidityPoolContract?.round(),
                        liquidityPoolContract?.totalDeposited(),
                        liquidityPoolContract?.minDepositAmount(),
                        liquidityPoolContract?.maxAllowedUsers(),
                        liquidityPoolContract?.usersCurrentlyInPool(),
                        liquidityPoolContract?.canCloseCurrentRound(),
                        liquidityPoolContract?.paused(),
                        liquidityPoolContract?.roundLength(),
                        liquidityPoolContract?.stakedThalesMultiplier(),
                    ]);

                    liquidityPoolData.liquidityPoolStarted = liquidityPoolStarted;
                    liquidityPoolData.maxAllowedDeposit = bigNumberFormmaterWithDecimals(maxAllowedDeposit, decimals);
                    liquidityPoolData.round = Number(round);
                    liquidityPoolData.allocationNextRound = bigNumberFormmaterWithDecimals(
                        allocationNextRound,
                        decimals
                    );
                    liquidityPoolData.availableAllocationNextRound =
                        liquidityPoolData.maxAllowedDeposit - liquidityPoolData.allocationNextRound;
                    liquidityPoolData.allocationNextRoundPercentage =
                        (liquidityPoolData.allocationNextRound / liquidityPoolData.maxAllowedDeposit) * 100;
                    liquidityPoolData.minDepositAmount = bigNumberFormmaterWithDecimals(minDepositAmount, decimals);
                    liquidityPoolData.maxAllowedUsers = Number(maxAllowedUsers);
                    liquidityPoolData.usersCurrentlyInLiquidityPool = Number(usersCurrentlyInLiquidityPool);
                    liquidityPoolData.canCloseCurrentRound = canCloseCurrentRound;
                    liquidityPoolData.paused = paused;
                    liquidityPoolData.roundLength = Number(roundLength) / 60 / 60 / 24;
                    liquidityPoolData.stakedThalesMultiplier = bigNumberFormatter(stakedThalesMultiplier);

                    const [allocationCurrentRound, lifetimePnl, roundEndTime] = await Promise.all([
                        liquidityPoolContract?.allocationPerRound(liquidityPoolData.round),
                        liquidityPoolContract?.cumulativeProfitAndLoss(
                            liquidityPoolData.round > 0 ? liquidityPoolData.round - 1 : 0
                        ),
                        liquidityPoolContract?.getRoundEndTime(liquidityPoolData.round),
                    ]);

                    liquidityPoolData.allocationCurrentRound = bigNumberFormmaterWithDecimals(
                        allocationCurrentRound,
                        decimals
                    );
                    liquidityPoolData.lifetimePnl =
                        bigNumberFormmaterWithDecimals(lifetimePnl, 18) === 0
                            ? 0
                            : bigNumberFormmaterWithDecimals(lifetimePnl, 18) - 1;
                    liquidityPoolData.roundEndTime = Number(roundEndTime) * 1000;
                    liquidityPoolData.isRoundEnded = new Date().getTime() > liquidityPoolData.roundEndTime;

                    return liquidityPoolData;
                }
            } catch (e) {
                console.log(e);
            }
            return undefined;
        },
        {
            refetchInterval: 5000,
            ...options,
        }
    );
};

export default useLiquidityPoolDataQuery;
