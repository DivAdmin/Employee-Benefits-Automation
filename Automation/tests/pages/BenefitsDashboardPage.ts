
import { Page, Locator, expect } from '@playwright/test';
import { calculateBenefits } from '../utils/benefitsCalculator';

export class BenefitsDashboardPage {
  readonly page: Page;
  readonly addEmployeeButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly dependentsInput: Locator;
  readonly saveEmployeeButton: Locator;
  readonly updateEmployeeButton: Locator;
  readonly deleteEmployeeButton: Locator;
  readonly employeesTable: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.addEmployeeButton = page.locator('//button[@id="add"]');
    this.firstNameInput = page.locator('//input[@id="firstName"]');
    this.lastNameInput = page.locator('//input[@id="lastName"]');
    this.dependentsInput = page.locator('//input[@id="dependants"]');
    this.saveEmployeeButton = page.locator('//button[@id="addEmployee"]');
    this.employeesTable = page.locator('//table[@id="employeesTable"]');
    this.updateEmployeeButton = page.locator('//button[@id="updateEmployee"]');
    this.deleteEmployeeButton = page.locator('//button[@id="deleteEmployee"]');
  }

  async addEmployee(firstName: string, lastName: string, dependents: number) {
    await this.addEmployeeButton.click();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.dependentsInput.fill(String(dependents));
    await this.saveEmployeeButton.click();
  }

  employeeIdByName(name: string): Locator {
    return this.page.locator(`//table[@id="employeesTable"]//tr[td[normalize-space()='${name}']]/td[count(//table[@id="employeesTable"]//th[normalize-space()='Id']/preceding-sibling::th)+1]`);
  }

  rowForEmployeeId(id: string): Locator {
  return this.page.locator('#employeesTable tbody tr').filter({
    has: this.page.locator('td:first-child', { hasText: id })
  });
}

// rowForEmployee(id: string, firstName: string, lastName: string): Locator {
//   return this.employeesTable.getByRole('row', {
//     name: new RegExp(`^${id}.*${firstName}.*${lastName}`, 'i'),
//   });
// }

rowForEmployee(id: string, firstName: string, lastName: string): Locator {
  return this.employeesTable
    .locator('tr')
    .filter({
      has: this.page.locator('td:first-child', { hasText: id }),
      hasText: new RegExp(`${firstName}.*${lastName}`, 'i'),
    });
}


//   const id = await employeePage.employeeIdByName("Test3").innerText();
// console.log("Generated ID:", id);

  // rowForEmployee(firstName: string, lastName: string): Locator {
  //   return this.employeesTable.getByRole('row', {
  //     name: new RegExp(`${firstName}.*${lastName}`, 'i'),
  //   });
  // }

  async editEmployee(id: string,originalFirst: string, originalLast: string, newFirst: string, newLast: string, newDependents: number) {
    const row = this.rowForEmployee(id,originalFirst, originalLast);
    await expect(row).toBeVisible();
    await row.locator(':scope i.fa-edit').click();

    // await row.getByRole('button', { name: /edit/i }).click();

    await this.firstNameInput.fill(newFirst);
    await this.lastNameInput.fill(newLast);
    await this.dependentsInput.fill(String(newDependents));
    await this.updateEmployeeButton.click();
  }

  async deleteEmployee(id: string,firstName: string, lastName: string) {
    const row = this.rowForEmployee(id,firstName, lastName);
    await expect(row).toBeVisible();
    await row.locator(':scope i.fa-times').click();
    await this.deleteEmployeeButton.click();
    // await row.getByRole('button', { name: /x|delete/i }).click();
  }
}