import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Input, Layout, Table, Tag, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { contentStyle, tableStyle } from '../styles';
import { fetchCoinsList } from '../redux/actions';

const { Content } = Layout;
const { Title } = Typography;

const CoinsList = () => {
  const dispatch = useDispatch();
  const { coinsList } = useSelector((state) => ({
    coinsList: state.coinsList
  }));

  const [setSearchText] = useState('');
  const searchInput = useRef(null);

  useEffect(() => {
    dispatch(fetchCoinsList());
  }, [dispatch]);

  function getColumnSearchProps(dataIndex) {
    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm)}
            style={{ width: 120, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm)}
            size="small"
            style={{ width: 120 }}>
            Filter
          </Button>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
    };
  }

  function handleSearch(selectedKeys, confirm) {
    confirm();
    setSearchText(selectedKeys[0]);
  }

  const loading = coinsList.length > 0 ? false : true;

  const columns = [
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
      ...getColumnSearchProps('symbol')
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      render: (item) => <Tag color="green">{item}</Tag>
    },
    {
      title: 'Button',
      dataIndex: 'id',
      key: 'id',
      render: (id) => (
        <Button type="primary">
          <Link to={`/${id}`}>View</Link>
        </Button>
      )
    }
  ];
  return (
    <Layout>
      <Content style={contentStyle}>
        <Title>Coins List</Title>
        <Table
          columns={columns}
          dataSource={coinsList}
          loading={loading}
          style={tableStyle}
          rowKey="id"
        />
      </Content>
    </Layout>
  );
};

export default React.memo(CoinsList);
