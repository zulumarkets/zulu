import Tooltip from 'components/Tooltip';
import useLeaderboardByVolumeQuery from 'queries/marchMadness/useLeaderboardByVolumeQuery';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Column, useTable } from 'react-table';
import { getNetworkId, getWalletAddress } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import { getDefaultColleteralForNetwork } from 'utils/collaterals';
import { getEtherscanAddressLink } from 'utils/etherscan';
import { formatCurrencyWithKey } from 'utils/formatters/number';
import { truncateAddress } from 'utils/formatters/string';
import {
    Arrow,
    Container,
    NoDataContainer,
    NoDataLabel,
    OverlayContainer,
    StickyRow,
    Table,
    TableContainer,
    TableHeader,
    TableHeaderCell,
    TableHeaderContainer,
    TableRow,
    TableRowCell,
} from './styled-components';

export const TooltipStyle = { backgroundColor: '#021631', border: '1px solid #005EB8' };

const TableByVolume: React.FC = () => {
    const { t } = useTranslation();
    const networkId = useSelector((state: RootState) => getNetworkId(state));
    const walletAddress = useSelector((state: RootState) => getWalletAddress(state));

    const columns: Column[] = useMemo(() => {
        return [
            {
                Header: '',
                accessor: 'rank',
            },
            {
                Header: <>{t('march-madness.leaderboard.address')}</>,
                accessor: 'walletAddress',
                Cell: (cellProps) => (
                    <>
                        {truncateAddress(cellProps.cell.value, 5)}
                        <a
                            href={getEtherscanAddressLink(networkId, cellProps.cell.value)}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Arrow />
                        </a>
                    </>
                ),
            },
            {
                Header: <>{t('march-madness.leaderboard.volume')}</>,
                accessor: 'volume',
                Cell: (cellProps) => (
                    <>{formatCurrencyWithKey(getDefaultColleteralForNetwork(networkId), cellProps.cell.value, 2)}</>
                ),
            },
            {
                Header: () => (
                    <>
                        {t('march-madness.leaderboard.base-volume')}
                        <Tooltip
                            overlayInnerStyle={TooltipStyle}
                            overlay={
                                <OverlayContainer>
                                    {t('march-madness.leaderboard.tooltip-base-volume-table')}
                                </OverlayContainer>
                            }
                            iconFontSize={14}
                            marginLeft={2}
                            top={0}
                        />
                    </>
                ),
                accessor: 'baseVolume',
                Cell: (cellProps) => (
                    <>{formatCurrencyWithKey(getDefaultColleteralForNetwork(networkId), cellProps.cell.value, 2)}</>
                ),
            },
            {
                Header: () => (
                    <>
                        {t('march-madness.leaderboard.bonus-volume')}
                        <Tooltip
                            overlayInnerStyle={TooltipStyle}
                            overlay={
                                <OverlayContainer>
                                    {t('march-madness.leaderboard.tooltip-bonus-volume-table')}
                                </OverlayContainer>
                            }
                            iconFontSize={14}
                            marginLeft={2}
                            top={0}
                        />
                    </>
                ),
                accessor: 'bonusVolume',
                Cell: (cellProps) => (
                    <>{formatCurrencyWithKey(getDefaultColleteralForNetwork(networkId), cellProps.cell.value, 2)}</>
                ),
            },
            {
                Header: () => (
                    <>
                        {t('march-madness.leaderboard.rewards')}
                        <Tooltip
                            overlayInnerStyle={TooltipStyle}
                            overlay={
                                <OverlayContainer>
                                    {t('march-madness.leaderboard.tooltip-rewards-volume-table')}
                                </OverlayContainer>
                            }
                            iconFontSize={14}
                            marginLeft={2}
                            top={0}
                        />
                    </>
                ),
                accessor: 'rewards',
            },
        ];
    }, [networkId, t]);

    const leaderboardQuery = useLeaderboardByVolumeQuery(networkId);

    const data = useMemo(() => {
        if (leaderboardQuery.isSuccess && leaderboardQuery.data) return leaderboardQuery.data?.leaderboard;
        return [];
    }, [leaderboardQuery.data, leaderboardQuery.isSuccess]);

    const myScore = useMemo(() => {
        if (data) {
            return data.filter((user) => user.walletAddress.toLowerCase() == walletAddress?.toLowerCase());
        }
        return [];
    }, [data, walletAddress]);

    const filteredData = useMemo(() => {
        if (data) {
            const myScore = data.filter((user) => user.walletAddress.toLowerCase() == walletAddress?.toLowerCase());
            if (myScore.length) {
                console.log('MyScore ', myScore);
                return data.filter((user) => user.walletAddress.toLowerCase() !== walletAddress?.toLowerCase());
            }
            return data;
        }
        return [];
    }, [data, walletAddress]);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data: filteredData,
    });

    const stickyRow = useMemo(() => {
        if (myScore?.length) {
            return (
                <StickyRow myScore={true}>
                    <TableRowCell>{myScore[0].rank}</TableRowCell>
                    <TableRowCell>{t('march-madness.leaderboard.my-rewards').toUpperCase()}</TableRowCell>
                    <TableRowCell>
                        {formatCurrencyWithKey(getDefaultColleteralForNetwork(networkId), myScore[0].volume, 2)}
                    </TableRowCell>
                    <TableRowCell>
                        {formatCurrencyWithKey(getDefaultColleteralForNetwork(networkId), myScore[0].baseVolume, 2)}
                    </TableRowCell>
                    <TableRowCell>
                        {formatCurrencyWithKey(getDefaultColleteralForNetwork(networkId), myScore[0].bonusVolume, 2)}
                    </TableRowCell>
                    <TableRowCell>{myScore[0].rewards}</TableRowCell>
                </StickyRow>
            );
        }
    }, [myScore, networkId, t]);

    return (
        <Container>
            <TableHeaderContainer hideBottomBorder={true}>
                <TableHeader>{'By volume'}</TableHeader>
            </TableHeaderContainer>
            <TableContainer>
                {!filteredData?.length && (
                    <NoDataContainer>
                        <NoDataLabel>{t('march-madness.leaderboard.no-data')}</NoDataLabel>
                    </NoDataContainer>
                )}
                {filteredData?.length > 0 && (
                    <Table {...getTableProps()}>
                        <thead>
                            {headerGroups.map((headerGroup, headerGroupIndex) => (
                                <tr {...headerGroup.getHeaderGroupProps()} key={headerGroupIndex}>
                                    {headerGroup.headers.map((column, columnKey) => (
                                        <TableHeaderCell {...column.getHeaderProps()} key={columnKey}>
                                            {column.render('Header')}
                                        </TableHeaderCell>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {myScore ? stickyRow : <></>}
                            {rows.map((row, rowKey) => {
                                prepareRow(row);
                                return (
                                    <TableRow {...row.getRowProps()} key={rowKey} hideBorder={rowKey == rows.length}>
                                        {row.cells.map((cell, cellIndex) => {
                                            return (
                                                <TableRowCell {...cell.getCellProps()} key={cellIndex}>
                                                    {cell.render('Cell')}
                                                </TableRowCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </tbody>
                    </Table>
                )}
            </TableContainer>
        </Container>
    );
};

export default TableByVolume;
