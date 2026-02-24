import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BenefitsDashboardPage } from '../pages/BenefitsDashboardPage';

let firstName: string; 
let updatedFirstName: string; 
let lastName: string;
let updatedLastName: string; 

test.describe('Paylocity Benefits Dashboard - Employee management', () => {

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('TestUser895', 'BozPR{^3)@^m'); 
    const unique = Date.now(); 
    firstName = `TestFN_${unique}`; 
    lastName = `TestLN_${unique}`;
   
  });

  test('Add Employee', async ({ page }) => {
    const dashboard = new BenefitsDashboardPage(page);
    await dashboard.addEmployee(firstName, lastName, 2);
    const id = await dashboard.getEmployeeIdByName(firstName,lastName);
    // const id = await dashboard.employeeIdByName('EmilyAuto').innerText();
    await expect(dashboard.rowForEmployee(id)).toBeVisible();
    // await expect(dashboard.rowForEmployee(id, 'PetrAuto', 'PavelAuto')).toBeVisible();

  });

  test('Edit Employee', async ({ page }) => {
    const dashboard = new BenefitsDashboardPage(page);
    await dashboard.addEmployee(firstName, lastName, 1);
    const id = await dashboard.getEmployeeIdByName(firstName,lastName);
    await expect(dashboard.rowForEmployee(id)).toBeVisible();
    // await expect(dashboard.employeeIdByName('AvaAuto')).toBeVisible();
    // const id = await dashboard.employeeIdByName('AvaAuto').innerText();
    const unique = Date.now(); 
    updatedFirstName =`UpTestFN_${unique}`; 
    updatedLastName =`UpLastFN_${unique}`; 
    await dashboard.editEmployee(id,firstName, lastName, updatedFirstName, updatedLastName, 4);
    await expect(dashboard.rowForEmployee(id)).toBeVisible();
    // await expect(dashboard.rowForEmployee(id,'NoahAuto', 'AndersonAuto')).toBeVisible();
  });

  test('Delete Employee', async ({ page }) => {
    const dashboard = new BenefitsDashboardPage(page);

    await dashboard.addEmployee(firstName, lastName, 0);
    const id = await dashboard.getEmployeeIdByName(firstName,lastName);
    await expect(dashboard.rowForEmployee(id)).toBeVisible();
    // await expect(dashboard.employeeIdByName('AnnaAuto')).toBeVisible();
    // const id = await dashboard.employeeIdByName('AnnaAuto').innerText();

    await dashboard.deleteEmployee(id,firstName,lastName);

    await expect(dashboard.rowForEmployee(id)).toHaveCount(0);
    // await expect(dashboard.rowForEmployee(id,'AnnaAuto', 'TiradoAuto')).toHaveCount(0);
  });
});
