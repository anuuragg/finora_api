const express = require("express");
const cors = require('cors')
const cookieParser = require("cookie-parser");
const dbConnect = require("./lib/dbConnect");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const subCatRoutes = require("./routes/sub_cat");
const incomeRoutes = require("./routes/income");
const expenseRoutes = require("./routes/expenses");
const totalBalRoutes = require('./routes/totalBalance');
require("dotenv").config();

const app = express();
dbConnect();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/sub-cat", subCatRoutes);
app.use("/income", incomeRoutes);
app.use("/expense", expenseRoutes);
app.use('/total', totalBalRoutes);

app.get("/", (req, res) => {
  res.send("I'm in my room, lol");
});

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
