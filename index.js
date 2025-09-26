const express = require('express');
const cookieParser = require('cookie-parser');
const dbConnect = require('./lib/dbConnect');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user')
const incomeRoutes = require('./routes/income')
require('dotenv').config();

const app = express();
dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/income", incomeRoutes);

app.get('/', (req, res) => {
	res.send("I'm in my room, lol");
})

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`)
});