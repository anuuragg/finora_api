# Expense Management API

A REST API for managing personal finances with income and expense tracking.

## Installation

1. Clone the repository:
```bash
git clone https://github.com/anuuragg/finora_api.git
cd finora-api
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=8888
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. Start the server:
```bash
npm run dev
```

## Project Structure

```
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── incomeController.js
│   ├── incomeSrcController.js
│   ├── expenseController.js
│   └── subCatController.js
├── routes/
│   ├── auth.js
│   ├── user.js
│   ├── income.js
│   ├── expenses.js
│   └── sub_cat.js
├── middlewares/
│   └── verifyToken.js
├── lib/
│   └── dbConnect.js
│   └── customError.js
├── .env
├── server.js
└── package.json
```

## API Endpoints

### Authentication Routes - `/auth`
- `POST /signup` - Register user
- `POST /login` - Login user

### User Routes - `/user`
- `GET /get-user` - Get user profile
- `PUT /update-user/:id` - Update user
- `DELETE /delete-user/:id` - Delete user

### Subcategory Routes - `/sub-cat`
- `GET /get-all-sub-cat` - Get all subcategories
- `GET /get-sub-cat/:id` - Get specific subcategory
- `POST /create-sub-cat` - Create subcategory
- `DELETE /delete-sub-cat/:id` - Delete subcategory

### Income Routes - `/income`
**Income Sources:**
- `GET /get-all-income-src` - Get all income sources
- `GET /get-income-src/:id` - Get specific income source
- `POST /add-income-src` - Add income source
- `PUT /update-income-src/:id` - Update income source
- `DELETE /delete-income-src/:id` - Delete income source

**Income Records:**
- `GET /get-all-income` - Get all income records
- `GET /get-income/:id` - Get specific income record
- `POST /add-income` - Add new income log
- `PUT /update-income/:id` - Update income
- `DELETE /delete-income/:id` - Delete income

### Expense Routes - `/expense`
- `POST /create-expense` - Create expense
- `GET /get-expense/:id` - Get specific expense
- `GET /get-all-expenses` - Get all expenses
- `PUT /update-expense/:id` - udpdate specific expense
- `DELETE /delete-expense/:id` - Delete expense

### Total Balance Routes - `/total`
- `GET /get-records` - Get total balance
- `GET /get-specific-record` - Get total balance for a specified date