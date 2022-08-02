import { GlobalFilterEnum } from 'constants/markets';
import QUERY_KEYS from 'constants/queryKeys';
import { SPORTS_MAP } from 'constants/tags';
import { useQuery, UseQueryOptions } from 'react-query';
import thalesData from 'thales-data';
import { SportMarketInfo, SportMarkets } from 'types/markets';
import { NetworkId } from 'types/network';
import { bigNumberFormatter } from 'utils/formatters/ethers';
import { fixDuplicatedTeamName, fixLongTeamName } from 'utils/formatters/string';
import networkConnector from 'utils/networkConnector';

const useSportMarketsQuery = (
    networkId: NetworkId,
    globalFilter: GlobalFilterEnum,
    options?: UseQueryOptions<SportMarkets>
) => {
    return useQuery<SportMarkets>(
        QUERY_KEYS.SportMarkets(networkId, globalFilter),
        async () => {
            try {
                let markets: SportMarketInfo[];
                console.log('promena');
                switch (globalFilter) {
                    case GlobalFilterEnum.OpenMarkets:
                        markets = await thalesData.sportMarkets.markets({
                            isOpen: true,
                            network: networkId,
                        });
                        break;
                    case GlobalFilterEnum.Canceled:
                        markets = await thalesData.sportMarkets.markets({
                            isCanceled: true,
                            network: networkId,
                        });
                        break;
                    case GlobalFilterEnum.ResolvedMarkets:
                        markets = await thalesData.sportMarkets.markets({
                            isResolved: true,
                            network: networkId,
                        });
                        break;
                    case GlobalFilterEnum.All:
                        markets = await thalesData.sportMarkets.markets({
                            network: networkId,
                        });
                        break;
                    case GlobalFilterEnum.YourPositions:
                        markets = await thalesData.sportMarkets.markets({
                            network: networkId,
                        });
                        break;
                    case GlobalFilterEnum.Claim:
                        markets = await thalesData.sportMarkets.markets({
                            isOpen: false,
                            network: networkId,
                        });
                        break;
                    default:
                        markets = await thalesData.sportMarkets.markets({
                            isOpen: true,
                            network: networkId,
                        });
                }

                console.log(markets);

                if (
                    globalFilter == GlobalFilterEnum.OpenMarkets ||
                    globalFilter == GlobalFilterEnum.All ||
                    globalFilter == GlobalFilterEnum.YourPositions
                ) {
                    const sportPositionalMarketDataContract = networkConnector.sportPositionalMarketDataContract;
                    const marketsWithOdds = await sportPositionalMarketDataContract
                        ?.getOddsForAllActiveMarkets()
                        .then((result: SportMarkets) => {
                            const mappedMarkets = markets.map((market: SportMarketInfo) => {
                                market.maturityDate = new Date(market.maturityDate);
                                market.homeTeam = fixDuplicatedTeamName(market.homeTeam);
                                market.awayTeam = fixDuplicatedTeamName(market.awayTeam);
                                market = fixLongTeamName(market);
                                market.sport = SPORTS_MAP[market.tags[0]];
                                if (market.isOpen) {
                                    result
                                        .filter((obj: any) => obj[0] === market.id)
                                        .map((obj: any) => {
                                            market.homeOdds = bigNumberFormatter(obj.odds[0]);
                                            market.awayOdds = bigNumberFormatter(obj.odds[1]);
                                            market.drawOdds = obj.odds[2] ? bigNumberFormatter(obj.odds[2]) : 0;
                                        });
                                }

                                return market;
                            });
                            return mappedMarkets;
                        })
                        .catch((e: any) => console.log(e));
                    return marketsWithOdds as SportMarkets;
                }

                const mappedMarkets = markets.map((market: SportMarketInfo) => {
                    market.maturityDate = new Date(market.maturityDate);
                    market.homeTeam = fixDuplicatedTeamName(market.homeTeam);
                    market.awayTeam = fixDuplicatedTeamName(market.awayTeam);
                    market = fixLongTeamName(market);
                    market.sport = SPORTS_MAP[market.tags[0]];
                    return market;
                });

                return mappedMarkets as SportMarkets;
            } catch (e) {
                console.log(e);
            }
            return [];
        },
        {
            refetchInterval: 60 * 1000,
            ...options,
        }
    );
};

export default useSportMarketsQuery;
