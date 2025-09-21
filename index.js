const express = require('express');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 8888;

app.get('/', (req, res) => {
	res.send("I'm in my room, lol");
})

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`)
});