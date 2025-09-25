const express = require('express');
const dbConnect = require('./lib/dbConnect');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();
dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);

app.get('/', (req, res) => {
	res.send("I'm in my room, lol");
})

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`)
});