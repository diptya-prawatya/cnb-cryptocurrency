import axios from 'axios';

import { GET_COIN_CHART, GET_COIN_DETAILS, GET_COINS_LIST } from '../../constants';

const axiosInstance = axios.create({
  timeout: 2 * 60 * 1000
});

const baseURL = 'https://api.coingecko.com/api/v3';

export const fetchCoinsList = () => async (dispatch) => {
  const url = `${baseURL}/coins/list`;

  await axiosInstance
    .get(url)
    .then(function (res) {
      dispatch({
        type: GET_COINS_LIST,
        payload: res.data
      });
    })
    .catch(function (err) {
      console.error('fetchCoinsList error: ', err);
    });
};

export const fetchCoinDetails = (coinId) => async (dispatch) => {
  const url = `${baseURL}/coins${coinId}`;

  await axiosInstance
    .get(url)
    .then(function (res) {
      dispatch({
        type: GET_COIN_DETAILS,
        payload: res.data
      });
    })
    .catch(function (err) {
      console.error('fetchCoinDetails error: ', err);
    });
};

export const fetchCoinMarketChart = (coinId) => async (dispatch) => {
  const url = `${baseURL}/coins/${coinId}/market_chart?vs_currency=usd&days=7`;

  await axiosInstance
    .get(url)
    .then(function (res) {
      dispatch({
        type: GET_COIN_CHART,
        payload: res.data
      });
    })
    .catch(function (err) {
      console.error('fetchCoinChart error: ', err);
    });
};
