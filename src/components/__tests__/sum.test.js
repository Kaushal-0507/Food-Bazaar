test("sum of two numbers", () => {
  const sum = (a, b) => {
    return a + b;
  };
  const results = sum(5, 5);

  //Assertion
  expect(results).toBe(10);
});
