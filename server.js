const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

let submissions = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit', (req, res) => {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
        return res.send("All fields are required. Please go back and fill them.");
    }

    if (!email.includes('@') || !email.includes('.')) {
        return res.send("Invalid email format. Please go back.");
    }

    if (password.length < 6) {
        return res.send("Password too short. Must be at least 6 characters.");
    }

    submissions.push({ fullname, email, password });
    console.log("Current Submissions:", submissions);

    res.send(`<h2>Thank you, ${fullname}!</h2><p>Your data has been submitted successfully.</p>`);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
