export interface EmployeeInput {
  dependentsCount: number;
}

export interface BenefitResult {
  yearlyBenefitsCost: number;
  perPaycheckDeduction: number;
  netPayPerPaycheck: number;
}

export function calculateBenefits(input: EmployeeInput): BenefitResult {
  const basePayPerPaycheck = 2000;
  const paychecksPerYear = 26;
  const employeeBenefitPerYear = 1000;
  const dependentBenefitPerYear = 500;

  const yearlyBenefitsCost =
    employeeBenefitPerYear + input.dependentsCount * dependentBenefitPerYear;

  const perPaycheckDeduction = yearlyBenefitsCost / paychecksPerYear;
  const netPayPerPaycheck = basePayPerPaycheck - perPaycheckDeduction;

  return {
    yearlyBenefitsCost,
    perPaycheckDeduction,
    netPayPerPaycheck,
  };
}
