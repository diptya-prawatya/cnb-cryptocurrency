import React, { useEffect } from 'react';
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

import { contentStyle, titleStyle, colStyle, cardStyle, tableStyle } from '../styles';
import { fetchCoinDetails, fetchCoinMarketChart } from '../redux/actions';
import { rank_score, market_statistics, market_table } from '../constants';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const CoinDetails = () => {
  const coinId = useLocation().pathname;

  const dispatch = useDispatch();
  const { coinDetails, coinMarketChart } = useSelector((state) => ({
    coinDetails: state.coinDetails,
    coinMarketChart: state.coinMarketChart
  }));

  useEffect(() => {
    dispatch(fetchCoinDetails(coinId));
    dispatch(fetchCoinMarketChart(coinId));
  }, [dispatch]);

  const { name, image, last_updated } = coinDetails;

  const { market_data, processed_market_data } = coinDetails;

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
                {coinDetails ? (
                  <Statistic precision={1} title={key} value={coinDetails[key]} />
                ) : (
                  <></>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      </>
    );
  };

  const loading = Object.keys(coinDetails).length > 0 ? false : true;

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
                {market_data ? (
                  <Statistic precision={1} title={key} value={market_data[key]} />
                ) : (
                  <></>
                )}
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
          columns={columns}></Table>
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
          </>
        )}
      </Content>
    </Layout>
  );
};

export default React.memo(CoinDetails);
