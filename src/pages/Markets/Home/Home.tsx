import Button from 'components/Button';
import SimpleLoader from 'components/SimpleLoader';
import { DEFAULT_SEARCH_DEBOUNCE_MS } from 'constants/defaults';
import useDebouncedMemo from 'hooks/useDebouncedMemo';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getIsAppReady } from 'redux/modules/app';
import { getIsWalletConnected, getNetworkId, getWalletAddress } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import styled from 'styled-components';
import { FlexDivColumn, FlexDivColumnCentered, FlexDivRow, FlexDivStart } from 'styles/common';
import {
    AccountPosition,
    AccountPositionsMap,
    GamesOnDate,
    SortOptionType,
    SportMarketInfo,
    SportMarkets,
    TagInfo,
    Tags,
} from 'types/markets';
import GlobalFilter from '../components/GlobalFilter';
import TagButton from '../../../components/TagButton';
import MarketsGrid from './MarketsGrid';
// import { navigateTo } from 'utils/routes';
// import ROUTES from 'constants/routes';
import { GlobalFilterEnum, SortDirection, DEFAULT_SORT_BY } from 'constants/markets';
import SortOption from '../components/SortOption';
import useAccountPositionsQuery from 'queries/markets/useAccountPositionsQuery';
import Toggle from 'components/fields/Toggle';
import { LOCAL_STORAGE_KEYS } from 'constants/storage';
import useLocalStorage from 'hooks/useLocalStorage';
import { isClaimAvailable } from 'utils/markets';
import { getMarketSearch, setMarketSearch } from 'redux/modules/market';
import useSportMarketsQuery from 'queries/markets/useSportMarketsQuery';
import { TAGS_LIST } from 'constants/tags';
import HeaderDatepicker from './HeaderDatepicker';

const Home: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));
    const networkId = useSelector((state: RootState) => getNetworkId(state));
    const walletAddress = useSelector((state: RootState) => getWalletAddress(state)) || '';
    const isWalletConnected = useSelector((state: RootState) => getIsWalletConnected(state));
    const marketSearch = useSelector((state: RootState) => getMarketSearch(state));

    const [globalFilter, setGlobalFilter] = useLocalStorage(LOCAL_STORAGE_KEYS.FILTER_GLOBAL, GlobalFilterEnum.All);
    const [sortDirection, setSortDirection] = useLocalStorage(LOCAL_STORAGE_KEYS.SORT_DIRECTION, SortDirection.ASC);
    const [sortBy, setSortBy] = useLocalStorage(LOCAL_STORAGE_KEYS.SORT_BY, DEFAULT_SORT_BY);
    const [showOpenMarkets, setShowOpenMarkets] = useLocalStorage(LOCAL_STORAGE_KEYS.FILTER_SHOW_OPEN_MARKETS, true);
    const [lastValidMarkets, setLastValidMarkets] = useState<SportMarkets>([]);
    const [accountPositions, setAccountPositions] = useState<AccountPositionsMap>({});

    const sortOptions: SortOptionType[] = [
        { id: 1, title: t('market.time-remaining-label') },
        // { id: 2, title: t('market.question-label') },
    ];

    const allTagsFilterItem: TagInfo = {
        id: 0,
        label: t('market.filter-label.all'),
    };

    const [tagFilter, setTagFilter] = useLocalStorage(LOCAL_STORAGE_KEYS.FILTER_TAGS, allTagsFilterItem);
    const [availableTags, setAvailableTags] = useState<Tags>([allTagsFilterItem]);

    const [dateFilter, setDateFilter] = useLocalStorage(LOCAL_STORAGE_KEYS.FILTER_DATES, '');
    const [gamesPerDay, setGamesPerDayMap] = useState<GamesOnDate[]>([]);

    const sportMarketsQuery = useSportMarketsQuery(networkId, { enabled: isAppReady });

    useEffect(() => {
        if (sportMarketsQuery.isSuccess && sportMarketsQuery.data) {
            setLastValidMarkets(sportMarketsQuery.data);
        }
    }, [sportMarketsQuery.isSuccess, sportMarketsQuery.data]);

    const markets: SportMarkets = useMemo(() => {
        if (sportMarketsQuery.isSuccess && sportMarketsQuery.data) {
            return sportMarketsQuery.data as SportMarkets;
        }
        return lastValidMarkets;
    }, [sportMarketsQuery.isSuccess, sportMarketsQuery.data]);

    useEffect(() => {
        setAvailableTags([allTagsFilterItem, ...TAGS_LIST.sort((a, b) => a.label.localeCompare(b.label))]);
    }, []);

    useEffect(() => {
        const marketDates = markets
            .filter((market: SportMarketInfo) => market.maturityDate >= new Date())
            .map((market: SportMarketInfo) => market.maturityDate);
        const uniqueSortedDates = marketDates
            .filter((date, i, self) => self.findIndex((d) => d.toDateString() === date.toDateString()) === i)
            .sort((a, b) => a.getTime() - b.getTime());

        const daysNumberOfGames = new Array<GamesOnDate>();
        uniqueSortedDates.forEach((date) => {
            const gamesPerDay = markets.filter(
                (market: SportMarketInfo) => market.maturityDate.toDateString() === date?.toDateString()
            ).length;
            daysNumberOfGames.push({ date: date.toDateString(), numberOfGames: gamesPerDay });
        });
        setGamesPerDayMap(daysNumberOfGames);
    }, [markets]);

    const accountPositionsQuery = useAccountPositionsQuery(walletAddress, networkId, {
        enabled: isAppReady && isWalletConnected,
    });

    useEffect(() => {
        if (accountPositionsQuery.isSuccess && accountPositionsQuery.data) {
            setAccountPositions(accountPositionsQuery.data);
        }
    }, [accountPositionsQuery.isSuccess, accountPositionsQuery.data]);

    const searchFilteredMarkets = useDebouncedMemo(
        () => {
            return marketSearch
                ? markets.filter(
                      (market: SportMarketInfo) =>
                          market.homeTeam.toLowerCase().includes(marketSearch.toLowerCase()) ||
                          market.awayTeam.toLowerCase().includes(marketSearch.toLowerCase())
                  )
                : markets;
        },
        [markets, marketSearch],
        DEFAULT_SEARCH_DEBOUNCE_MS
    );

    const datesFilteredMarkets = useMemo(() => {
        let filteredMarkets = marketSearch ? searchFilteredMarkets : markets;

        if (dateFilter !== '') {
            filteredMarkets = filteredMarkets.filter(
                (market: SportMarketInfo) => market.maturityDate.toDateString() === dateFilter
            );
        }

        return filteredMarkets;
    }, [markets, searchFilteredMarkets, dateFilter, marketSearch]);

    const tagsFilteredMarkets = useMemo(() => {
        let filteredMarkets = datesFilteredMarkets;

        if (tagFilter.id !== allTagsFilterItem.id) {
            filteredMarkets = filteredMarkets.filter((market: SportMarketInfo) =>
                market.tags.map((tag) => Number(tag)).includes(tagFilter.id)
            );
        }

        return filteredMarkets;
    }, [markets, datesFilteredMarkets, tagFilter, marketSearch]);

    const accountClaimsCount = useMemo(() => {
        return tagsFilteredMarkets.filter((market: SportMarketInfo) => {
            const accountPosition: AccountPosition = accountPositions[market.address];
            return isClaimAvailable(market, accountPosition);
        }).length;
    }, [tagsFilteredMarkets, accountPositions]);

    const showOpenMarketsFilteredMarkets = useMemo(() => {
        let filteredMarkets = tagsFilteredMarkets;

        if (tagFilter.id !== allTagsFilterItem.id) {
            filteredMarkets = filteredMarkets.filter((market: SportMarketInfo) =>
                market.tags.map((tag) => Number(tag)).includes(tagFilter.id)
            );
        }

        filteredMarkets = filteredMarkets.filter((market: SportMarketInfo) => market.isResolved !== showOpenMarkets);

        return filteredMarkets;
    }, [tagsFilteredMarkets, tagFilter, showOpenMarkets]);

    const totalCount = showOpenMarketsFilteredMarkets.length;

    const accountPositionsCount = useMemo(() => {
        return showOpenMarketsFilteredMarkets.filter((market: SportMarketInfo) => {
            const accountPosition: AccountPosition = accountPositions[market.address];
            return !!accountPosition && accountPosition.position > 0;
        }).length;
    }, [showOpenMarketsFilteredMarkets, accountPositions]);

    const globalFilteredMarkets = useMemo(() => {
        let filteredMarkets = showOpenMarketsFilteredMarkets;

        switch (globalFilter) {
            case GlobalFilterEnum.YourPositions:
                filteredMarkets = filteredMarkets.filter((market: SportMarketInfo) => {
                    const accountPosition: AccountPosition = accountPositions[market.address];
                    return !!accountPosition && accountPosition.position > 0;
                });
                break;
            case GlobalFilterEnum.Claim:
                filteredMarkets = filteredMarkets.filter((market: SportMarketInfo) => {
                    const accountPosition: AccountPosition = accountPositions[market.address];
                    return isClaimAvailable(market, accountPosition);
                });
                break;
            default:
                break;
        }

        return filteredMarkets.sort((a, b) => {
            switch (sortBy) {
                case 1:
                    return sortByField(a, b, sortDirection, 'maturityDate');
                // case 2:
                //     return sortByField(a, b, sortDirection, 'question');
                default:
                    return 0;
            }
        });
    }, [showOpenMarketsFilteredMarkets, sortBy, sortDirection, globalFilter, accountPositions]);

    const setSort = (sortOption: SortOptionType) => {
        if (sortBy === sortOption.id) {
            switch (sortDirection) {
                case SortDirection.NONE:
                    setSortDirection(SortDirection.ASC);
                    break;
                case SortDirection.DESC:
                    setSortDirection(SortDirection.ASC);
                    break;
                case SortDirection.ASC:
                    setSortDirection(SortDirection.DESC);
                    setSortBy(DEFAULT_SORT_BY);
                    break;
            }
        } else {
            setSortBy(sortOption.id);
            setSortDirection(SortDirection.ASC);
        }
    };

    const resetFilters = () => {
        setGlobalFilter(GlobalFilterEnum.All);
        setDateFilter('');
        setTagFilter(allTagsFilterItem);
        setShowOpenMarkets(true);
        dispatch(setMarketSearch(''));
    };

    const marketsList = globalFilteredMarkets;

    return (
        <Container>
            <FiltersContainer>
                <HeaderDatepicker gamesPerDay={gamesPerDay} dateFilter={dateFilter} setDateFilter={setDateFilter} />
            </FiltersContainer>
            <RowContainer>
                <SidebarContainer></SidebarContainer>
                {sportMarketsQuery.isLoading ? (
                    <LoaderContainer>
                        <SimpleLoader />
                    </LoaderContainer>
                ) : marketsList.length === 0 ? (
                    <NoMarketsContainer>
                        <NoMarketsLabel>{t('market.no-markets-found')}</NoMarketsLabel>
                        <Button onClick={resetFilters}>{t('market.view-all-markets')}</Button>
                    </NoMarketsContainer>
                ) : (
                    <MarketsGrid markets={marketsList} accountPositions={accountPositions} />
                )}
                <SidebarContainer>
                    <GlobalFiltersContainer>
                        {Object.values(GlobalFilterEnum).map((filterItem) => {
                            const count =
                                filterItem === GlobalFilterEnum.All
                                    ? totalCount
                                    : filterItem === GlobalFilterEnum.YourPositions
                                    ? accountPositionsCount
                                    : filterItem === GlobalFilterEnum.Claim
                                    ? accountClaimsCount
                                    : undefined;

                            return (
                                <GlobalFilter
                                    disabled={false}
                                    selected={globalFilter === filterItem}
                                    onClick={() => {
                                        if (filterItem === GlobalFilterEnum.Claim) {
                                            setShowOpenMarkets(false);
                                        }
                                        setGlobalFilter(filterItem);
                                    }}
                                    key={filterItem}
                                    count={count}
                                >
                                    {t(`market.filter-label.global.${filterItem.toLowerCase()}`)}
                                </GlobalFilter>
                            );
                        })}
                        {sortOptions.map((sortOption) => {
                            return (
                                <SortOption
                                    disabled={false}
                                    selected={sortOption.id === sortBy}
                                    sortDirection={sortDirection}
                                    onClick={() => setSort(sortOption)}
                                    key={sortOption.title}
                                >
                                    {sortOption.title}
                                </SortOption>
                            );
                        })}
                    </GlobalFiltersContainer>
                    <TagsContainer>
                        {availableTags.map((tag: TagInfo) => {
                            return (
                                <TagButton
                                    disabled={false}
                                    selected={tagFilter.id === tag.id}
                                    onClick={() => setTagFilter(tagFilter.id === tag.id ? allTagsFilterItem : tag)}
                                    key={tag.label}
                                >
                                    {tag.label}
                                </TagButton>
                            );
                        })}
                    </TagsContainer>
                    <ToggleContainer>
                        <Toggle
                            isLeftOptionSelected={showOpenMarkets}
                            onClick={() => {
                                setShowOpenMarkets(!showOpenMarkets);
                            }}
                            leftText={t('market.open-markets-label')}
                            rightText={t('market.resolved-markets-label')}
                        />
                    </ToggleContainer>
                </SidebarContainer>
            </RowContainer>
        </Container>
    );
};

const sortByField = (
    a: SportMarketInfo,
    b: SportMarketInfo,
    direction: SortDirection,
    field: keyof SportMarketInfo
) => {
    if (direction === SortDirection.ASC) {
        return (a[field] as any) > (b[field] as any) ? 1 : -1;
    }
    if (direction === SortDirection.DESC) {
        return (a[field] as any) > (b[field] as any) ? -1 : 1;
    }

    return 0;
};

const Container = styled(FlexDivColumn)`
    width: 100%;
`;

const RowContainer = styled(FlexDivRow)`
    width: 100%;
    flex: 1 1 0%;
    flex-direction: row;
    justify-content: stretch;
`;

const SidebarContainer = styled(FlexDivColumn)`
    padding-top: 25px;
    max-width: 240px;
    flex-grow: 1;
`;

const ToggleContainer = styled(FlexDivColumn)`
    align-items: end;
    span {
        text-transform: uppercase;
        margin-bottom: 5px;
    }
    > div {
        margin-bottom: 0px;
    }
    .toogle {
        font-size: 15px;
        line-height: 102.6%;
        padding-bottom: 5px;
        margin-bottom: 10px;
        height: 36px;
        align-items: center;
    }
    i {
        margin-top: -9px;
    }
`;

const FiltersContainer = styled(FlexDivRow)`
    align-self: center;
    margin-bottom: 4px;
`;

const GlobalFiltersContainer = styled(FlexDivColumn)`
    height: fit-content;
    flex: 0;
`;

const TagsContainer = styled(FlexDivStart)`
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 10px;
`;

const NoMarketsContainer = styled(FlexDivColumnCentered)`
    min-height: 200px;
    align-items: center;
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    line-height: 100%;
    button {
        padding-top: 1px;
    }
`;

const NoMarketsLabel = styled.span`
    margin-bottom: 30px;
`;

const LoaderContainer = styled(FlexDivColumn)`
    position: relative;
    min-height: 300px;
`;

export default Home;
