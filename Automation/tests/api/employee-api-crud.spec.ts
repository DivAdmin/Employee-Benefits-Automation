import { test, expect } from '@playwright/test';
import { EmployeeClient } from '../pages/employee-client-page';
import { calculateBenefits } from '../utils/benefit-calculationutil-api';
import { v4 as uuidv4 } from 'uuid';

test.describe('Paylocity Benefits Dashboard API Automation', () => {
  let client: EmployeeClient;
  let firstName: string; 
  let updatedFirstName: string; 
  let lastName: string;
  let updatedLastName: string; 
  let userName: string;
  let updateddependants : number;
  let dashboard:any;
  const employeeId = uuidv4();
  const unique = Date.now(); 
  firstName = `TestAPIFN_${unique}`; 
  lastName = `TestAPILN_${unique}`;
  userName = `TestUserAPI_${unique}`;

  test.beforeEach(async ({ playwright }) => {
    const api = await playwright.request.newContext({});
     const baseUrl = process.env.API_BASE_URL as string;
    const token = process.env.API_TOKEN as string; 
    client = new EmployeeClient(api, baseUrl,token);
  });

  test('Add Employee + Validate Benefit Calculations', async () => {
    const payload = {  
      firstName: firstName,
      lastName: lastName,
      username: userName,
      // id: employeeId,
      dependants: 2, 
      expiration: "2026-09-04T04:33:20.140Z",
      salary: 52000
    };

    const created = await client.createEmployee(payload);
    expect(created.firstName).toBe(firstName);
    const expected = calculateBenefits(payload.dependants);
    expect(created.gross).toBeCloseTo(expected.grossSalary, 2);
    expect(created.benefitsCost).toBeCloseTo(expected.benefitsCost, 2);
    expect(created.net).toBeCloseTo(expected.net, 2);
  });

  test('Edit Employee', async () => {
    const employeeId = uuidv4();

    const payload = {
      firstName: firstName,
      lastName: lastName,
      username: userName,
      id: employeeId,
      dependants: 1, 
      expiration: "2026-09-04T04:33:20.140Z",
      salary: 52000
    };
   
   const created= await client.createEmployee(payload);
    updatedFirstName=`upTestAPIFN_${unique}`; 
    updateddependants=5; 

    const updatedPayload = {
      firstName: updatedFirstName,
      lastName: lastName,
      username: userName,
      id : created.id,
      dependants: updateddependants,
      expiration: "2026-09-04T04:33:20.140Z",
      salary: 52000
    };

    const updated = await client.updateEmployee(updatedPayload);
    expect(updated.firstName).toBe(updatedFirstName);

    expect(updated.dependants).toBe(updateddependants);
    console.log("updated.dependants",updated.dependants);

    const expected = calculateBenefits(updated.dependants);
    expect(updated.benefitsCost).toBeCloseTo(expected.benefitsCost, 2);
    expect(updated.net).toBeCloseTo(expected.net, 2);

  });

test('Delete Employee', async () => {
    const employeeId = uuidv4();

    const payload = {
      firstName: firstName,
      lastName: lastName,
      username: userName,
      id: employeeId,
      dependants: 32, 
      expiration: "2026-09-04T04:33:20.140Z",
      salary: 52000
    };
    const created = await client.createEmployee(payload);
    
    await client.deleteEmployee(created.id);

    const response = await client.getEmployeeById(created.id);
    expect(response).toBeNull(); 
  });

});
