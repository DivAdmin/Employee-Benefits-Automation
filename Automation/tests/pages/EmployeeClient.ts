import { APIRequestContext, expect } from '@playwright/test';

export class EmployeeClient {
  constructor( 
    private request: APIRequestContext, 
    private baseUrl: string, 
    private token: string ) {}

  async createEmployee(payload: any) {
    const response = await this.request.post(`${this.baseUrl}/api/Employees`, 
      { data: payload, 
        headers: 
        { 
          Authorization: this.token
        }
     });
    
    expect(response.ok()).toBeTruthy();
    return response.json();
  }

  async getEmployeeById(id: string) 
  {
    const response = await this.request.get(`${this.baseUrl}/api/Employees/${id}`, { headers: { Authorization: this.token } }); 
    if (response.status() === 204) { return null; } 
    const text = await response.text(); 
    if (!text) { return null; } 
    return JSON.parse(text);
  }

  async updateEmployee(payload: any) 
  {
    const response = await this.request.put(`${this.baseUrl}/api/Employees`, 
      { data: payload, 
        headers: 
        { 
          Authorization: this.token
        }
     });
    expect(response.ok()).toBeTruthy();
    return response.json();
  }

  async deleteEmployee(id: string) 
  {  
     const response = await this.request.delete(`${this.baseUrl}/api/Employees/${id}`, 
      { 
        headers: 
        { 
          Authorization: this.token
        }
     });
    expect(response.ok()).toBeTruthy();
    return response;
  }
}
