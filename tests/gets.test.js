// ****************** CREATED BY JARED BELLAMY 9/5/2022 ************************************
// *************** NOTE - IF USER HAS USED TO MANY API REQUESTS IN THE LAST MINUTE THE TESTS WILL FAIL! To fix, make sure there are no requests within 1-5 minutes of testing. **********************
const { GetTickers, GetAggregate } = require("../gets");

test("testing return from gets functions", async () => {
  const tickers = await GetTickers();
  const aggregate = await GetAggregate("A");

  // Never return undefined or null
  expect(tickers).toBeTruthy();
  expect(aggregate).toBeTruthy();

  // Tickers should always be a length of 3
  expect(tickers.results.length).toBe(3);
  // Aggregates should always return more than 0
  expect(aggregate.resultsCount).not.toEqual(0);
});
