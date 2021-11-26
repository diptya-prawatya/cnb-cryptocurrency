import { market_table } from '../constants';

export const processMarketData = (marketData) => {
  let data = {};

  for (let i = 0; i < market_table.length; i++) {
    let column = market_table[i];
    let entries = Object.entries(marketData[column]);

    for (let i = 0; i < entries.length; i++) {
      let key = entries[i][0];
      let value = entries[i][1];

      if (Object.keys(data).includes(key)) {
        data[key] = { ...data[key], [column]: value, currency: key };
      } else {
        data[key] = { [column]: value, currency: key };
      }
    }
  }

  return Object.values(data);
};

export const chartOptions = {
  responsive: true,
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }
    ],
    yAxes: [
      {
        gridLines: {
          display: false
        }
      }
    ]
  }
};
