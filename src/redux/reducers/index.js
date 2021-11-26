import { combineReducers } from 'redux';

import { ERROR, GET_COIN_CHART, GET_COIN_DETAILS, GET_COINS_LIST } from '../../constants';
import { processMarketData } from '../../utils';

const coinsList = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_COINS_LIST:
      return payload;
    default:
      return state;
  }
};

const coinDetails = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_COIN_DETAILS:
      const processed_market_data = processMarketData(payload?.market_data);
      return { ...payload, processed_market_data };
    default:
      return state;
  }
};

const coinMarketChart = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_COIN_CHART:
      return payload;
    default:
      return state;
  }
};

const serverError = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ERROR:
      return payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  coinsList,
  coinDetails,
  coinMarketChart,
  serverError
});

export default rootReducer;
