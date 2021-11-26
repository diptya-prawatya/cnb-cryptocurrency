import { cleanup } from '@testing-library/react';
import axios from 'axios';

afterEach(cleanup);

export const fetchCoinDetails = async () => {
  const url = 'https://api.coingecko.com/api/v3/coins/bitcoin';
  return axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

test('data return from fetching api', async () => {
  const res = await fetchCoinDetails();

  expect(res.id).toBe('bitcoin');
  expect(res.symbol).toBe('btc');
  expect(res.name).toBe('Bitcoin');
  expect(res.image.large).toBe(
    'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579'
  );
});
