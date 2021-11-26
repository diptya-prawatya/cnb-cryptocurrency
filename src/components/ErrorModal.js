import React from 'react';
import { useSelector } from 'react-redux';

import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const ErrorModal = () => {
  const { serverError } = useSelector((state) => ({
    serverError: state.serverError
  }));

  const errorMessage = typeof serverError === 'object' ? '' : serverError;

  return errorMessage ? (
    <Card style={{ width: 300, margin: '2em' }}>
      <Title>{errorMessage}</Title>
      <Paragraph>Please refresh the page</Paragraph>
    </Card>
  ) : null;
};

export default React.memo(ErrorModal);
