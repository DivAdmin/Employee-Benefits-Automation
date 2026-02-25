Paylocity Benefits Dashboard – Playwright UI & API Automation

This repository contains a complete automation framework for testing the **Paylocity Benefits Dashboard**, covering both **UI** and **API** layers using **Playwright**, **TypeScript**, and **dotenv** for environment configuration.

The project demonstrates:
- Modern UI automation with Page Object Model (POM)
- API automation with CRUD operations
- Environment-driven configuration using `.env`
- Reusable utilities for benefits calculation
- Clean project structure

Tech Stack
UI Automation : Playwright (TypeScript) 
API Automation : Playwright API Testing 
Test Runner: Playwright Commands
Environment Management: dotenv
Reporting: Playwright HTML Report
Language: TypeScript 

Environment Variables :
1.The project uses a single `.env` file for both UI and API tests.
2.Create your own `.env` file based on `.env.example`
UI Credentials:
APP_USERNAME=
APP_PASSWORD=
APP_BASE_URL=

API Credentials:
API_BASE_URL=
API_TOKEN=

How to Run Testcases:
UI Testcases: 
1. To run All the UI testcases: 
npx playwright test tests/ui/employee-ui-crud.spec.ts

API Testcases: 
1. To run All the API testcases:
npx playwright test tests/api/employee-api-crud.spec.ts

To See Playwright HTML report:
npx playwright show-report
