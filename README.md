📄 Project Overview

This repository contains automated tests for Airalo’s platform, including:

- 🧪 **UI Automation** using [Playwright](https://playwright.dev)
- 🔁 **API Automation** against the Airalo Partner API

---

## 🖥️ UI Test: Japan eSIM Package Verification

### 🎯 Test Objective  
Verify the UI flow for selecting and purchasing a Japan eSIM from Airalo's homepage.

### 📋 Test Steps  
1. Launch the homepage.  
2. Search for "Japan" in the destination field.  
3. Select Japan from the autocomplete.  
4. Choose the first listed eSIM package.  
5. Click "Buy Now."  
6. Assert package details in modal:
   - Title: `Moshi Moshi`
   - Coverage: `Japan`
   - Data: `1 GB`
   - Validity: `7 days`
   - Price: `$4.50`

### ✅ Result  
- Test automated using Playwright  
- Run on CI via GitHub Actions  
- Screenshots & videos generated on failure  
- **Passes locally & in CI/CD pipeline**

---

## 🌐 API Tests: Airalo Partner API

### 🔐 Step 1: Authentication  
- Used `/v2/token` endpoint to fetch OAuth2 `access_token`  
- Token stored using Postman's environment variable scripting

### 📦 Step 2: Place Order  
**Endpoint:** `POST /v1/orders`  
- Body:
  ```json
  {
    "esim_slug": "merhaba-7days-1gb",
    "quantity": 6
  }
  ```
- Auth: Bearer token  
- Result:  
  ❗ Received `422 Unprocessable Entity`  
  > “The requested eSIM package is invalid or it is currently out of stock.”

### 📃 Step 3: Retrieve eSIM List  
**Endpoint:** `GET /v1/esims`  
- Auth: Bearer token  
- Postman Tests:
  - ✅ Ensure exactly 6 items returned  
  - ✅ All items match slug `"merhaba-7days-1gb"`

### 📌 Notes  
- Test scripts written in Postman's **Test** tab  
- Collection exported as part of repo  
- Though order failed (stock issue), **authentication & validation logic function as expected**

---

## 📦 Installation

```bash
git clone https://github.com/ShemiSarav/airalochallenge.git
cd airalochallenge
npm install
npx playwright test
```
