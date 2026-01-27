# 🎭 Playwright Automation Framework (TypeScript) – AutomationExercise

A complete **industry-style End-to-End Automation Framework** built using **Playwright + TypeScript** to automate UI + API workflows, with support for **data-driven testing (Excel/JSON)**, **network mocking**, **visual testing**, and **Jenkins CI pipeline**.

---

## ✅ Tech Stack

- Playwright Test Runner
- TypeScript
- Allure Reporting
- ExcelJS (Excel Data Driven Testing)
- Jenkins CI
- GitHub (Version Control)

---

## 📌 Automation Coverage

### ✅ UI Automation (`@UI`)
- Login
- Signup
- Product Search
- Review Product
- Place Order (E2E flow)
- Contact Us

### ✅ API Automation (`@API`)
- Products List API validation
- Search Product API
- Verify Login API (Playwright `APIRequestContext` + reusable API clients)

### ✅ Mock Testing (`@MOCK`)
- `route.fulfill()` → Mock response
- `route.continue()` → Modify request / redirect
- `route.abort()` → Simulate server down

### ✅ Visual Testing (`@VISUAL`)
- Home page snapshot baseline comparison
- Products page snapshot baseline comparison

---

## 🏗️ Framework Folder Structure

```bash
playwright-automationexercise-e2e/
│
├── tests/
│   ├── ui/               # UI Tests
│   ├── api/              # API Tests
│   ├── mocks/            # Network Mocking Tests
│   ├── visual/           # Visual Tests
│   └── setup/            # StorageState setup (login once)
│
├── pages/                # Page Object Model (POM)
├── fixtures/             # Custom fixtures
├── utils/                # Utilities (Excel, API clients, generators)
├── test-data/            # JSON/Excel test data
│
├── playwright.config.ts
├── Jenkinsfile
├── package.json
└── README.md

## 🚀 How to Run Tests

### 🔧 Install dependencies
npm install
npx playwright install

### ▶️ Test Execution Commands
✅ Run Regression
npm run test:regression

✅ Run UI tests
npm run test:ui

✅ Run API tests
npm run test:api

✅ Run Mock tests
npm run test:mocks

✅ Run Visual tests
npm run test:visual

### 📊 Allure Report
Generate Report -
npm run allure:gen

Open Report - 
npm run allure:open

### 🧾 Allure Screenshots

![Allure Dashboard](assets/allure-dashboard.png)
![Allure Test Details](assets/allure-test-details.png)

### 🧠 Key Framework Highlights:
✅ Page Object Model (POM) implementation
✅ Data-Driven Testing using Excel + JSON
✅ Direct login using storageState session handling
✅ API automation using APIRequestContext
✅ Industry mocking using fulfill / continue / abort
✅ Visual Regression baseline comparisons
✅ Jenkins Pipeline with suite selection parameter
✅ Retry, parallel execution, artifacts generation

###🔁 Jenkins Integration
A parameterized Jenkins pipeline is added using Jenkinsfile:
Select Suite: UI / API / Visual / Mock / Regression
Run tests automatically
Generate Allure Report
Archive artifacts

###🔗 Application Under Test (AUT)
UI: https://automationexercise.com/
APIs: https://automationexercise.com/api_list

###👤 Author
Akshay More
SDET | Playwright | API Automation | CI/CD (Jenkins)
```