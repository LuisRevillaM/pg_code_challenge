function calculateCost({ age, name, gender, healthCondition }) {
  if (age < 18) {
    return null;
  }
  const BASE_COST = 100;

  const costChangingPolicies = [
    getAgeIncreaseFn(age),
    getConditionIncreaseFn(healthCondition),
    getGenderDiscountFn(gender),
  ];

  const finalPrice = costChangingPolicies.reduce((price, change) => {
    return change(price);
  }, BASE_COST);

  return [name, `$${finalPrice.toFixed(2)}`];
}

function getAgeIncreaseFn(age) {
  const freq = 5;
  const increase = 20;

  return (price) => {
    const multiple = Math.floor((age - 18) / freq);

    return price + multiple * increase;
  };
}

function getConditionIncreaseFn(condition) {
  const conditionToCostPercentageMap = {
    "Allergies": 1,
    "Sleep Apnea": 6,
    "Heart Disease": 17,
  };

  return (price) => {
    const increase = (price * conditionToCostPercentageMap[condition]) / 100;
    return increase + price;
  };
}

function getGenderDiscountFn(gender) {
  return (price) => {
    if (gender === "female") {
      return price - 12;
    }

    return price;
  };
}

function getCostForManyCustomers(customers) {
  return customers.reduce((ar, c) => {
    const cost = calculateCost(c);
    if (cost) {
      ar.push(cost);
    }
    return ar;
  }, []);
}

module.exports = {
  getCostForManyCustomers,
  calculateCost,
};
