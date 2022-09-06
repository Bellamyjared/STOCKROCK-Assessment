// ****************** CREATED BY JARED BELLAMY 9/5/2022 ************************************
const { GetTickers, GetAggregate } = require("./gets");

const CollectData = async () => {
  const tickers = await GetTickers();

  let data = [];
  // error handling - if user has run out of API requests, result will be undefined
  if (tickers.results) {
    for (const ticker of tickers.results) {
      // add ticker to data list, and get aggregate price data of select ticker
      data = [
        ...data,
        { ticker: ticker, aggregates: await GetAggregate(ticker.ticker) },
      ];
    }
  } else {
    data = undefined;
  }
  return data;
};

const ProcessData = async () => {
  // get ticker and aggregate data
  const dataList = await CollectData();

  // error handling - will mainly fail when user has used to many API requests within the last minute, resolved when user tries later
  if (dataList) {
    let returnList = [];

    for (const data of dataList) {
      let aggreData = [];
      // error handling - if the ticker has any aggregates and if the user hasn't used all available API requests
      if (
        data.aggregates.resultsCount != 0 &&
        typeof data.aggregates.status != "undefined"
      ) {
        // store open, close, and difference of the aggregates prices
        for (const aggre of data.aggregates.results) {
          // get the difference between openning and closing prices
          const calcDif = aggre.o - aggre.c;

          aggreData = [
            ...aggreData,
            {
              openPrice: aggre.o.toFixed(4),
              closePrice: aggre.c.toFixed(4),
              difference: calcDif.toFixed(4),
            },
          ];
        }

        // add Ticker's data to returnList
        returnList = [
          ...returnList,
          {
            ticker: data.ticker.ticker,
            tickerName: data.ticker.name,
            aggreData: aggreData,
          },
        ];
      } else {
        returnList = [
          ...returnList,
          {
            ticker:
              "There was an error in gathering your Ticker data. Please try again later",
            tickerName: null,
            aggreData: null,
          },
        ];
      }
    }
    return returnList;
  } else {
    return null;
  }
};

module.exports = { ProcessData, CollectData };
