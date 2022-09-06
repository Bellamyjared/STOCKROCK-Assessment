// ****************** CREATED BY JARED BELLAMY 9/5/2022 ************************************
const { restClient, referenceClient } = require("@polygon.io/client-js");
// personal APIKey, will be removed after 10/1/2022
const APIKey = "4sM3dvRoxOlODNXfV_p010QOJjPX7UTR";
const reference = referenceClient(APIKey);
const rest = restClient(APIKey);

// get Tickers from polygon.io API, exchange must be XNYS, limit to 3
const GetTickers = async () => {
  return reference
    .tickers({ exchange: "XNYS", limit: 3 })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

// get Aggregate data from polygon.io API, must get last 7 days, polygon.io only stores data from workdays (excludes workends and holidays)
const GetAggregate = async (tickerName) => {
  const date = new Date();
  // today
  date.setDate(date.getDate());
  const toDate = date.toISOString().split("T")[0];
  // 7 days ago
  date.setDate(date.getDate() - 7);
  const fromDate = date.toISOString().split("T")[0];

  // get aggregates data
  return rest.stocks
    .aggregates(
      (ticker = tickerName),
      (multiplier = 1),
      (timespan = "day"),
      (from = fromDate),
      (to = toDate)
    )
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

module.exports = { GetTickers, GetAggregate };
