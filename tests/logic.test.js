// ****************** CREATED BY JARED BELLAMY 9/5/2022 ************************************
// *************** NOTE - IF USER HAS USED TO MANY API REQUESTS IN THE LAST MINUTE THE TESTS WILL FAIL! To fix, make sure there are no requests within 1-5 minutes of testing. **********************
const { ProcessData, CollectData } = require("../logic");

test("testing return from ProcessData", async () => {
  const test = await ProcessData();

  // Never return undefined or null
  expect(test).toBeTruthy();

  // Always return 3 elements
  expect(test.length).toBe(3);
});

test("testing return from CollectData", async () => {
  const test = await CollectData();

  // Never return undefined or null
  expect(test).toBeTruthy();

  // Always return 3 elements
  expect(test.length).toBe(3);
});
