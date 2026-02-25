export function calculateBenefits(dependants: number) {
  const employeeBenefit = 1000;
  const dependantBenefit = dependants * 500;
  const totalYearlyBenefit = employeeBenefit + dependantBenefit;

  const paychecks = 26;
  const benefitsCost = totalYearlyBenefit / paychecks;

  const grossSalary = 2000;
  const net = grossSalary - benefitsCost;

  return {
    yearlyCost: totalYearlyBenefit,
    benefitsCost,
    grossSalary,
    net,
  };
}
