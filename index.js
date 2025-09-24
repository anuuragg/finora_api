const express = require('express');
const dbConnect = require('./lib/dbConnect')
const expenseRouter = require('./routers/expenseRouter')
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 8888;

app.use(express.json());
app.use("/api/expense", expenseRouter)
dbConnect();

app.get('/', (req, res) => {
	res.send("I'm in my room, lol");
})

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`)
});