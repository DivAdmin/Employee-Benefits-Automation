import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { BenefitsDashboardPage } from '../pages/benefits-dashboard-page';

let firstName: string; 
let updatedFirstName: string; 
let lastName: string;
let updatedLastName: string; 
let dashboard:any;

test.describe('Paylocity Benefits Dashboard - Employee management', () => {

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    dashboard = new BenefitsDashboardPage(page);
    await login.goto();
    await login.login(process.env.APP_USERNAME as string, process.env.APP_PASSWORD as string); 
    const unique = Date.now(); 
    firstName = `TestFN_${unique}`; 
    lastName = `TestLN_${unique}`;
    await dashboard.waitForTableToLoad();
  });

  test('Add Employee', async ({ page }) => {
    await dashboard.addEmployee(firstName, lastName, 2);
    const id = await dashboard.getEmployeeIdByName(firstName,lastName);
    await expect(dashboard.rowForEmployee(id)).toBeVisible();
 });

  test('Edit Employee', async ({ page }) => {
    await dashboard.addEmployee(firstName, lastName, 1);
    const id = await dashboard.getEmployeeIdByName(firstName,lastName);
    await expect(dashboard.rowForEmployee(id)).toBeVisible();
    const unique = Date.now(); 
    updatedFirstName =`UpTestFN_${unique}`; 
    updatedLastName =`UpLastFN_${unique}`; 
    await dashboard.editEmployee(id,firstName, lastName, updatedFirstName, updatedLastName, 4);
    await expect(dashboard.rowForEmployee(id)).toBeVisible();
    await expect(dashboard.rowForUpdatedEmployee(firstName,lastName)).toBeVisible();
  });

  test('Delete Employee', async ({ page }) => {
    await dashboard.addEmployee(firstName, lastName, 0);
    const id = await dashboard.getEmployeeIdByName(firstName,lastName);
    await expect(dashboard.rowForEmployee(id)).toBeVisible();
    await dashboard.deleteEmployee(id,firstName,lastName);
    await expect(dashboard.rowForEmployee(id)).toHaveCount(0);
  });
});
