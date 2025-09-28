# Expense Management API

A REST API for managing personal finances with income and expense tracking.

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd expense-management-api
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
npm start
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
├── .env
├── server.js
└── package.json
```

## API Endpoints

### Authentication Routes - `/api/auth`
- `POST /signup` - Register user
- `POST /login` - Login user

### User Routes - `/api/user`
- `GET /get-user` - Get user profile
- `PUT /update-user/:id` - Update user
- `DELETE /delete-user/:id` - Delete user

### Income Routes - `/api/income`
**Income Sources:**
- `GET /get-income-src` - Get all income sources
- `POST /add-income-src` - Add income source
- `PUT /update-income-src/:id` - Update income source
- `DELETE /delete-income-src/:income_src` - Delete income source

**Income Records:**
- `GET /get-income` - Get all income
- `POST /add-income` - Add income
- `PUT /update-income/:id` - Update income
- `DELETE /delete-income/:id` - Delete income

### Expense Routes - `/api/expense`
- `POST /create-expense` - Create expense
- `GET /get-expense/:id` - Get specific expense
- `GET /get-all-expenses` - Get all expenses
- `DELETE /delete-expense/:id` - Delete expense

### Subcategory Routes - `/api/sub-cat`
- `GET /get-all-sub-cat` - Get all subcategories
- `GET /get-sub-cat/:id` - Get specific subcategory
- `POST /create-sub-cat` - Create subcategory
- `DELETE /delete-sub-cat/:id` - Delete subcategory
