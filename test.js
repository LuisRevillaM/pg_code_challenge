const lib = require("./pg_code_challenge");
const assert = require("assert");

const customers = [
  { name: "Kelly", age: 50, gender: "female", healthCondition: "Allergies" },
  { name: "Josh", age: 40, gender: "male", healthCondition: "Sleep Apnea" },
  { name: "Brad", age: 20, gender: "male", healthCondition: "Heart Disease" },
];

describe("Calculates Cost", function () {
  it("should calculate the right cost", () => {
    const costForKelly = lib.calculateCost(customers[0]);

    assert.deepEqual(costForKelly, ["Kelly", "$210.20"]);
  });

  it("calculates cost for array of customers", () => {
    const costForCustomers = lib.getCostForManyCustomers(customers);

    assert.deepEqual(costForCustomers, [
      ["Kelly", "$210.20"],
      ["Josh", "$190.80"],
      ["Brad", "$117.00"],
    ]);
  });

  it("should ignore customers under 18", () => {
    const costForCustomers = lib.getCostForManyCustomers([
      ...customers,
      { name: "Jane", age: 17, gender: "female", healthCondition: null },
    ]);

    assert.deepEqual(costForCustomers, [
      ["Kelly", "$210.20"],
      ["Josh", "$190.80"],
      ["Brad", "$117.00"]
    ]);
  });
});
