import { Page, Locator, expect } from '@playwright/test';
import { calculateBenefits } from '../utils/benefit-calculationutil-ui';

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

  async waitForTableToLoad() {
    await this.page.waitForSelector('#employeesTable', { timeout: 30000 });
    await this.page.waitForFunction(() => {
      const tbody = document.querySelector('#employeesTable tbody tr');
      return tbody !== null;
    }, { timeout: 30000 });
  }

  async addEmployee(firstName: string, lastName: string, dependents: number) {
    await expect(this.addEmployeeButton).toBeVisible();
    await this.addEmployeeButton.click();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.dependentsInput.fill(String(dependents));
    await expect(this.saveEmployeeButton).toBeVisible();
    await this.saveEmployeeButton.click();
  }

  async getEmployeeIdByName(firstName: string, lastName: string): Promise<string> {
    const row = this.page.locator(`#employeesTable tbody tr:has(td:text-is("${firstName}")):has(td:text-is("${lastName}"))`);
    const id = await row.locator('td').first().innerText();
    return id;
  }

  rowForEmployee(id: string): Locator {
    return this.page.locator('#employeesTable tbody tr').filter({
      has: this.page.locator(`td:text-is("${id}")`)
    });
  }

  rowForUpdatedEmployee(firstName: string, lastName: string): Locator {
    return this.employeesTable.getByRole('row', {
      name: new RegExp(`${firstName}.*${lastName}`, 'i'),
    });
  }

  async editEmployee(id: string, originalFirst: string, originalLast: string, newFirst: string, newLast: string, newDependents: number) {
    const row = this.rowForEmployee(id);
    await expect(row).toBeVisible();
    await row.locator(':scope i.fa-edit').click();
    await this.firstNameInput.fill(newFirst);
    await this.lastNameInput.fill(newLast);
    await this.dependentsInput.fill(String(newDependents));
    await expect(this.updateEmployeeButton).toBeVisible();
    await this.updateEmployeeButton.click();
  }

  async deleteEmployee(id: string, firstName: string, lastName: string) {
    const row = this.rowForEmployee(id);
    await expect(row).toBeVisible();
    await row.locator(':scope i.fa-times').click();
    await expect(this.deleteEmployeeButton).toBeVisible();
    await this.deleteEmployeeButton.click();
  }
}