import { cleanup } from '@testing-library/react';
import axios from 'axios';

afterEach(cleanup);

export const fetchCoinsList = async () => {
  const url = 'https://api.coingecko.com/api/v3/coins/list';
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
  const res = await fetchCoinsList();

  expect(res[0].id).toBe('01coin');
  expect(res[0].symbol).toBe('zoc');
  expect(res[0].name).toBe('01coin');
});
