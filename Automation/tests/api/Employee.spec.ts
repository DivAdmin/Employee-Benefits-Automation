import { test, expect } from '@playwright/test';
import { EmployeeClient } from '../pages/EmployeeClient';
import { calculateBenefits } from '../pages/Benefits';
import { v4 as uuidv4 } from 'uuid';

test.describe('Paylocity Benefits Dashboard API Automation', () => {
  let client: EmployeeClient;

  test.beforeEach(async ({ playwright }) => {
    const api = await playwright.request.newContext({});
     const baseUrl = 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod'; 
    const token = 'Basic VGVzdFVzZXI4OTU6Qm96UFJ7XjMpQF5t'; 
    client = new EmployeeClient(api, baseUrl,token);
  });

  test('Add Employee + Validate Benefit Calculations', async () => {
    const employeeId = uuidv4();

    const payload = {  
      firstName: "Tisa",
      lastName: "Liam",
      username: "TestUser11",
      id: employeeId,
      dependants: 2, 
      expiration: "2026-09-04T04:33:20.140Z",
      salary: 2000
    };

    const created = await client.createEmployee(payload);

    // expect(created.id).toBe(employeeId);
    expect(created.firstName).toBe('Tisa');

    const expected = calculateBenefits(payload.dependants);

    expect(created.gross).toBeCloseTo(expected.gross, 2);
    expect(created.benefitsCost).toBeCloseTo(expected.costPerPaycheck, 2);
    expect(created.net).toBeCloseTo(expected.net, 2);
  });

  test('Edit Employee', async () => {
    const employeeId = uuidv4();

    const payload = {
      firstName: "Tina",
      lastName: "Anderson",
      username: "TestUser12",
      id: employeeId,
      dependants: 30, 
      expiration: "2026-09-04T04:33:20.140Z",
      salary: 2000
    };

    await client.createEmployee(payload);

    const updatedPayload = {
      ...payload,
      firstName: 'TinaDet',
      dependants: 3
    };

    const updated = await client.updateEmployee(updatedPayload);

    expect(updated.firstName).toBe('TinaDet');
    expect(updated.dependants).toBe(3);
  });

test('Delete Employee', async () => {
    const employeeId = uuidv4();

    const payload = {
      firstName: "Divya",
      lastName: "Khuba",
      username: "UsertoBeDeleted",
      id: employeeId,
      dependants: 32, 
      expiration: "2026-09-04T04:33:20.140Z",
      salary: 522
    };

    await client.createEmployee(payload);
    console.log("employeeId", employeeId);
    await client.deleteEmployee(employeeId);

    const response = await client.getEmployeeById(employeeId);
    expect(response).toBeNull(); 
  });

});
