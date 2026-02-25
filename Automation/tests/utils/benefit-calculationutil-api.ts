export function calculateBenefits(dependants: number) {
  const employeeCost = 1000;
  const dependantCost = dependants * 500;
  const totalYearlyCost = employeeCost + dependantCost;

  const paychecks = 26;
  const costPerPaycheck = totalYearlyCost / paychecks;

  const gross = 2000;
  const net = gross - costPerPaycheck;

  return {
    yearlyCost: totalYearlyCost,
    costPerPaycheck,
    gross,
    net,
  };
}
