import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Avatar,
  Button,
  Card,
  Col,
  Layout,
  Row,
  Skeleton,
  Statistic,
  Table,
  Tag,
  Typography
} from 'antd';
import { Line } from 'react-chartjs-2';

import { cardStyle, colStyle, contentStyle, tableStyle, titleStyle } from '../styles';
import { fetchCoinDetails, fetchCoinMarketChart } from '../redux/actions';
import { market_statistics, market_table, rank_score } from '../constants';
import { chartOptions } from '../utils';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const CoinDetails = () => {
  const coinId = useLocation().pathname;

  const dispatch = useDispatch();
  const { coinDetails, coinMarketChart } = useSelector((state) => ({
    coinDetails: state.coinDetails,
    coinMarketChart: state.coinMarketChart
  }));

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchCoinDetails(coinId));
    dispatch(fetchCoinMarketChart(coinId));
    setLoading(false);
  }, [dispatch, coinId]);

  const { name, image, last_updated } = coinDetails;
  const { market_data, processed_market_data } = coinDetails;

  const coinMarket = Object.keys(coinMarketChart);
  const pricesLoading = coinMarket.includes('prices') ? true : false;
  const marketCapsLoading = coinMarket.includes('market_caps') ? true : false;
  const totalVolumesLoading = coinMarket.includes('total_volumes') ? true : false;

  const getChartData = (loading, data, key, title, colour) => {
    return {
      labels: loading && data[key].map((item) => new Date(item[0]).toLocaleString()),
      datasets: [
        {
          label: title,
          data: loading && data[key]?.map((item) => item[1]),
          backgroundColor: colour
        }
      ]
    };
  };

  const chartPricesData = getChartData(
    pricesLoading,
    coinMarketChart,
    'prices',
    'Prices 7 Days in USD',
    'blue'
  );

  const chartMarketCapsData = getChartData(
    marketCapsLoading,
    coinMarketChart,
    'market_caps',
    'Market Caps 7 Day',
    'green'
  );

  const chartTotalVolumesData = getChartData(
    totalVolumesLoading,
    coinMarketChart,
    'total_volumes',
    'Total Volumes 7 Day',
    'red'
  );

  let columns = [
    {
      title: 'currency',
      key: 'currency',
      dataIndex: 'currency',
      render: (item) => <Tag color="green">{item}</Tag>
    },
    ...market_table.map((item) => ({
      title: item,
      key: item,
      dataIndex: item
    }))
  ];

  const Header = () => {
    return (
      <>
        <Title>
          <Avatar size="large" src={image?.large} style={{ marginRight: '1rem' }} />
          {name}
        </Title>
        <Paragraph>
          Last updated on <Tag>{new Date(last_updated).toDateString()}</Tag>
        </Paragraph>
        <Button type="primary" style={{ marginBottom: '1rem' }}>
          <Link to="/"> Back to coins list</Link>
        </Button>
      </>
    );
  };

  const RankScore = () => {
    return (
      <>
        <Title level={3} style={titleStyle}>
          Rank and Score
        </Title>
        <Row gutter={16} style={{ textAlign: 'center' }} type="flex">
          {rank_score.map((key, index) => (
            <Col key={index} xs={24} sm={24} md={12} lg={8} xl={8} style={colStyle}>
              <Card style={cardStyle}>
                {coinDetails && <Statistic precision={1} title={key} value={coinDetails[key]} />}
              </Card>
            </Col>
          ))}
        </Row>
      </>
    );
  };

  const MarketPrice = () => {
    return (
      <>
        <Title level={3} style={titleStyle}>
          Market Cap and Price Change
        </Title>
        <Row gutter={16} style={{ textAlign: 'center' }} type="flex">
          {market_statistics.map((key, index) => (
            <Col key={index} xs={24} sm={24} md={12} lg={8} xl={8} style={colStyle}>
              <Card style={cardStyle}>
                {market_data && <Statistic precision={1} title={key} value={market_data[key]} />}
              </Card>
            </Col>
          ))}
        </Row>
      </>
    );
  };

  const MarketTable = () => {
    return (
      <>
        <Title level={3} style={titleStyle}>
          Market Data
        </Title>
        <Table
          style={tableStyle}
          rowKey="currency"
          bordered
          dataSource={processed_market_data}
          columns={columns}
        />
      </>
    );
  };

  return (
    <Layout>
      <Content style={contentStyle}>
        {loading ? (
          <>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </>
        ) : (
          <>
            <Header />
            <RankScore />
            <MarketPrice />
            <MarketTable />

            <Title level={3} style={titleStyle}>
              Prices Chart
            </Title>
            <Line data={chartPricesData} options={chartOptions} />

            <Title level={3} style={titleStyle}>
              Market Caps Chart
            </Title>
            <Line data={chartMarketCapsData} options={chartOptions} />

            <Title level={3} style={titleStyle}>
              Total Volumes Chart
            </Title>
            <Line data={chartTotalVolumesData} options={chartOptions} />
          </>
        )}
      </Content>
    </Layout>
  );
};

export default React.memo(CoinDetails);
