import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BenefitsDashboardPage } from '../pages/BenefitsDashboardPage';

test.describe('Paylocity Benefits Dashboard - Employee management', () => {

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('TestUser895', 'BozPR{^3)@^m'); // replace with real creds
  });

  test('Add Employee', async ({ page }) => {
    const dashboard = new BenefitsDashboardPage(page);

    await dashboard.addEmployee('Petr', 'Pavel', 2);
    const id = await dashboard.employeeIdByName('Petr').innerText();
    console.log(id);
    await expect(dashboard.rowForEmployee(id, 'Petr', 'Pavel')).toBeVisible();

  });

  test('Edit Employee', async ({ page }) => {
    const dashboard = new BenefitsDashboardPage(page);
    await dashboard.addEmployee('Divya', 'Marc', 1);
    await expect(dashboard.employeeIdByName('Divya')).toBeVisible();
    const id = await dashboard.employeeIdByName('Divya').innerText();

    await dashboard.editEmployee(id,'Divya', 'Marc', 'Veronica', 'Sam', 4);
    await expect(dashboard.rowForEmployee(id,'Veronica', 'Sam')).toBeVisible();
  });

  test('Delete Employee', async ({ page }) => {
    const dashboard = new BenefitsDashboardPage(page);

    await dashboard.addEmployee('Anna', 'Tirado', 0);
    await expect(dashboard.employeeIdByName('Anna')).toBeVisible();
    const id = await dashboard.employeeIdByName('Anna').innerText();

    await dashboard.deleteEmployee(id,'Anna', 'Tirado');

    await expect(dashboard.rowForEmployee(id,'Anna', 'Tirado')).toHaveCount(0);
  });
});
