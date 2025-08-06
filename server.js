const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Temporary in-memory storage
const users = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/submit', (req, res) => {
    const { username, email, password } = req.body;
    let errorMsg = '';

    // Server-side validation
    if (!username || username.trim().length < 3) {
        errorMsg = 'Username must be at least 3 characters.';
    } else if (!email || !email.match(/^[\w\.-]+@[\w\.-]+\.\w{2,}$/)) {
        errorMsg = 'Enter a valid email address.';
    } else if (!password || password.length < 6) {
        errorMsg = 'Password must be at least 6 characters.';
    }

    if (errorMsg) {
        // Respond with error message (simple inline HTML for demo purposes)
        return res.send(`
            <div style="color:red; margin:20px auto; max-width:400px; font-family:Arial;">
                <p>${errorMsg}</p>
                <a href="/" style="color:#4CAF50;">Go Back</a>
            </div>
        `);
    }

    // Store validated data (in memory)
    users.push({ username, email });

    res.send(`
        <div style="color:green; margin:20px auto; max-width:400px; font-family:Arial;">
            <p>Registration successful!</p>
            <p>User: ${username} | Email: ${email}</p>
            <a href="/" style="color:#4CAF50;">Register Another</a>
        </div>
    `);
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});