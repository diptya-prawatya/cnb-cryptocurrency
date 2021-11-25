import { combineReducers } from 'redux';

import { GET_COIN_CHART, GET_COIN_DETAILS, GET_COINS_LIST } from '../../constants';

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
      return payload;
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

const rootReducer = combineReducers({
  coinsList,
  coinDetails,
  coinMarketChart
});

export default rootReducer;
